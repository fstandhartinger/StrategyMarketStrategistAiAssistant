import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import Modal from "@/components/shared/modal";
import {
  Connector,
  ConfigElement,
  ConfigSetting,
  ConfigSettingType,
} from "@/interfaces/connector";
import ConnectorCard from "@/components/shared/connector-card";
import ConfigElementRenderer from "@/components/shared/config-element-renderer";
import _ from "lodash";
//Import the OpenAPI Large Language Model (you can import other models here eg. Cohere)
import { OpenAI } from "langchain/llms/openai";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import { DynamicTool } from "langchain/tools";
import { Serper } from "langchain/tools";
//Import the agent executor module
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { BaseCallbackHandler } from "langchain/callbacks";
import { AgentAction } from "langchain/dist/schema";
import { useStartupContext } from '../../contexts/StartupContext';


/* OF COURSE THIS HAS TO BE REMOVED FROM THE CODE, THE WHOLE COMMUNICATION WITH THIRD PARTY APIS LIKE OPENAI AND SERPER HAS TO BE MOVED TO PUBLIC/API TO HIDE TE KEYS FROM THE ENDUSER */
const openAiKey = "sk-...";
const serperApiKey = "43...";

interface Action {
  tool: string;
  toolInput: string;
  log: string;
}

interface IntermediateStep {
  action: Action;
  observation: string;
}

interface Output {
  output: string;
  intermediateSteps: IntermediateStep[];
}




const ConnectorsTab: React.FC = () => {
  const [connectors, setConnectors] = useState<Connector[]>([]); // State variable to store the fetched connectors

  const { selectedStartup } = useStartupContext();

  const [selectedConnectors, setSelectedConnectors] = useState<Connector[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentConnector, setCurrentConnector] = useState<Connector | null>(
    null,
  );
  const [showConfigureModal, setShowConfigureModal] = useState(false); // State to control the visibility of the configure modal

  const [config, setConfig] = useState<Record<string, any>>(
    currentConnector?.config_json || {},
  );

  const [agentLog, setAgentLog] = useState<string[]>([
    "Agent team not started yet",
  ]); // Create a state variable to manage log entries
  const logContainerRef = useRef<HTMLDivElement>(null); // Create a ref for the log container

  class AgentLogger extends BaseCallbackHandler {
    constructor() {
      super();
    }

    name = "custom_handler";

    handleLLMNewToken(token: string) {}
    handleLLMStart(llm: { name: string }, _prompts: string[]) {
      setAgentLog((prevLog) => [...prevLog, `LLM ${llm.name} started`]);
    }

    handleChainStart(chain: { name: string }) {
      setAgentLog((prevLog) => [...prevLog, `LLM Chain ${chain.name} started`]);
    }

    handleAgentAction(action: AgentAction) {
      setAgentLog((prevLog) => [
        ...prevLog,
        `Agent action started`,
        `Agent uses tool: ${action.tool}`,
        `Input for tool: ${action.toolInput}`,
        `Additional info: ${action.log}`,
      ]);
    }

    handleToolStart(tool: { name: string }) {
      setAgentLog((prevLog) => [...prevLog, `Tool ${tool.name} started`]);
    }
  }

  useEffect(() => {
    // Fetch the list of connectors from the JSON file in the public folder
    fetch('/connectors.json')
      .then((response) => response.json())
      .then((data) => setConnectors(data));
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTo({
        top: logContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [agentLog]);

  const handleSaveConfiguration = (updatedConfig: Record<string, any>) => {
    if (currentConnector) {
      const updatedConnectors = selectedConnectors.map((connector) => {
        if (connector.id === currentConnector.id) {
          return { ...connector, config_json: updatedConfig };
        }
        return connector;
      });
      setSelectedConnectors(updatedConnectors);
      setShowConfigureModal(false);
    }
  };

  const handleAddConnector = (connector: Connector) => {
    if (selectedConnectors.length < 6) {
      setSelectedConnectors((prev) => [...prev, { ...connector }]);
    }
  };

  const handleRemoveConnector = (connector: Connector) => {
    setSelectedConnectors((prev) => prev.filter((item) => item !== connector));
  };

  const handleRunAgents = (connector: Connector) => {

    if (!selectedStartup) {
      alert("Please select a startup first");
      return;
    }

    setAgentLog(["Starting Agent Team..."]); // Reset the log when starting a new run

    setCurrentConnector(connector);
    //------------------------------------------------ START OF AGENT CODE HERE ----------------------------------------------------------------------

    const llm = new OpenAI({ temperature: 0.9, openAIApiKey: openAiKey });

    const prompt = new PromptTemplate({
      template: "{query}",
      inputVariables: ["query"],
    });
   
    const llmChain = new LLMChain({ llm: llm, prompt: prompt, verbose: true });

    const llmTool = new DynamicTool({
      name: "Language Model",
      func: (input: string) => llmChain.run(input),
      description: "use this tool for general purpose queries and logic",
    });

    const search = new Serper(serperApiKey);

    const tools = [llmTool, search];

    const run = async () => {

      const executor = await initializeAgentExecutorWithOptions(tools, llm, {
        agentType: "zero-shot-react-description",
        returnIntermediateSteps: true,
        maxIterations: connector.maxAgentIterations,
      });
      console.log("Loaded agent.");

      const input = (connector.prompt_template??"").replaceAll("STARTUP_DESCRIPTION", selectedStartup.description)

      console.log(input)

      const result: any = await executor.call({ input }, [new AgentLogger()]);

      const output: Output = result;

      // Log the main output

      // Log the intermediate steps
      output.intermediateSteps.forEach((step: IntermediateStep) => {
        const action = step.action;

        // Log the action log message
        setAgentLog((prevLog) => [...prevLog, action.log]);

        // Log the observation
        setAgentLog((prevLog) => [...prevLog, step.observation]);
      });

      setAgentLog((prevLog) => [...prevLog, output.output]);
    };

    run();

    //------------------------------------------------  END OF AGENT CODE HERE  ----------------------------------------------------------------------
    setShowConfigureModal(true); // Open the configure modal
  };

  const handleShowAgentsResult = (connector: Connector) => {
    setShowConfigureModal(true); // Open the configure modal
  };

  const handleExecutableDownload = () => {
    // Download logic here
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="m-4 flex-1 overflow-auto p-4">
        <h1 className="mb-4 text-2xl font-bold">AutoGPT Task Library</h1>
        <div className="mb-8 flex flex-wrap gap-4">
          {connectors.map((connector, index) => (
            <ConnectorCard
              key={index}
              connector={connector}
              onAdd={handleAddConnector}
            />
          ))}
        </div>
        <h1 className="mb-4 text-2xl font-bold">Chosen Tasks</h1>
        {selectedConnectors.length === 0 ? (
          <div className="mb-8 text-gray-600">
            <p>
              To get started, please add tasks from the Task Library above. You
              can then run the tasks or view their results.
            </p>
          </div>
        ) : (
          <div className="mb-8 flex flex-wrap gap-4">
            {selectedConnectors.map((connector, index) => (
              <div
                key={index}
                className="relative flex w-60 flex-col rounded-lg border bg-gray-300 p-4"
              >
                <Cross1Icon
                  className="absolute top-1 right-1 cursor-pointer"
                  onClick={() => handleRemoveConnector(connector)}
                />
                <h2 className="text-xl font-semibold">{connector.name}</h2>
                <p className="flex-1 text-sm">{connector.description}</p>

                <button
                  className="mt-2 rounded bg-gray-500 py-1 px-2 text-white"
                  onClick={() => handleRunAgents(connector)}
                >
                  Run
                </button>

                <button
                  className="mt-2 rounded bg-gray-500 py-1 px-2 text-white"
                  onClick={() => handleRunAgents(connector)}
                >
                  View run results
                </button>
              </div>
            ))}
          </div>
        )}{" "}
        <Modal
          showModal={showConfigureModal}
          setShowModal={setShowConfigureModal}
        >
          <div className="w-full max-w-2xl overflow-hidden shadow-xl md:rounded-2xl md:border md:border-gray-200">
            <div className="log-modal flex max-h-48 flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
              <h3 className="mb-6 font-display text-2xl font-bold">
                Task {currentConnector?.name} AutoGPT result
              </h3>
              <div className="log max-h-48 overflow-auto" ref={logContainerRef}>
                {" "}
                {/* Add a container with a max height and overflow auto */}
                {agentLog.map((text, index) => (
                  <div key={index} className="m-1 border border-slate-700">
                    {" "}
                    {text}{" "}
                  </div>
                ))}
              </div>
              <button
                className="mt-6 rounded bg-blue-500 py-1 px-2 text-white"
                onClick={() =>
                  handleSaveConfiguration(currentConnector?.config_json || {})
                }
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ConnectorsTab;
