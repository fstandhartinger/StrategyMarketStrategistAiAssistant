import React, { useState } from "react";
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

/* OF COURSE THESE WOULD BE LOADED FROM A DB, ALSO WE COULD ALLOW A DYNAMIC EDITOR TOTHE USER TO DEFINE ADDITIONAL AGENTS (CONNECTORS IN OUR LANGUAGE) */
const connectors: Connector[] = [
  {
    type: "Market research",
    description:
      "Gathering and analyzing market data to support startup decision-making.",
    name: "Market research",
    in_use: false,
    id: "TermId",
    name_for_human: "Market research",
    name_for_ai: "Market research",
    description_for_human: "",
    description_for_ai: "",
    is_configurable: false,
    config_elements: [],
    config_json: {}, 
    prompt_template: "Given this startup description:\n\n\n{{STARTUP_DESCRIPTION}}\n\n\nWhat are the most important market trends for this startup to consider?\n\n\nI want you to perform a market research, which means: Gathering and analyzing market data to support startup decision-making."
  },
  {
    type: "Opportunity Score",
    description:
      "A quantitative measure to prioritize potential solutions based on their impact, feasibility, and alignment with business goals.",
    name: "Opportunity Score",
    in_use: false,
    id: "TermId",
    name_for_human: "Opportunity Score",
    name_for_ai: "Opportunity Score",
    description_for_human: "",
    description_for_ai: "",
    is_configurable: false,
    config_elements: [],
    config_json: {}, prompt_template: ""
  },

  {
    type: "Research Briefs",
    description:
      "Concise, structured documents outlining the objectives, methodology, and scope of a research project to ensure focused, efficient, and valuable research.",
    name: "Research Briefs",
    in_use: false,
    id: "TermId",
    name_for_human: "Research Briefs",
    name_for_ai: "Research Briefs",
    description_for_human: "",
    description_for_ai: "",
    is_configurable: false,
    config_elements: [],
    config_json: {}, prompt_template: ""
  },

  {
    type: "Interview Scripts",
    description:
      "Guides for consistent, structured, and focused interviews that ensure reliable, accurate, and comparable data collection.",
    name: "Interview Scripts",
    in_use: false,
    id: "TermId",
    name_for_human: "Interview Scripts",
    name_for_ai: "Interview Scripts",
    description_for_human: "",
    description_for_ai: "",
    is_configurable: false,
    config_elements: [],
    config_json: {}, prompt_template: ""
  },

  {
    type: "Customer Tribe Modeling",
    description:
      "Segmenting customers into distinct groups based on shared characteristics to better understand target audiences and tailor marketing, sales, and product development efforts.",
    name: "Customer Tribe Modeling",
    in_use: false,
    id: "TermId",
    name_for_human: "Customer Tribe Modeling",
    name_for_ai: "Customer Tribe Modeling",
    description_for_human: "",
    description_for_ai: "",
    is_configurable: false,
    config_elements: [],
    config_json: {}, prompt_template: ""
  },

  {
    type: "Problem Framing",
    description:
      "Defining and structuring problems to facilitate effective problem-solving by clarifying goals, constraints, and desired outcomes.",
    name: "Problem Framing",
    in_use: false,
    id: "TermId",
    name_for_human: "Problem Framing",
    name_for_ai: "Problem Framing",
    description_for_human: "",
    description_for_ai: "",
    is_configurable: false,
    config_elements: [],
    config_json: {}, prompt_template: ""
  },

  {
    type: "How Might We Statements",
    description:
      "Open-ended questions that encourage creative thinking and problem-solving by reframing problems as opportunities.",
    name: "How Might We Statements",
    in_use: false,
    id: "TermId",
    name_for_human: "How Might We Statements",
    name_for_ai: "How Might We Statements",
    description_for_human: "",
    description_for_ai: "",
    is_configurable: false,
    config_elements: [],
    config_json: {}, prompt_template: ""
  },

  {
    type: "Brainstorming",
    description:
      "A creative technique that encourages free thinking and open discussion to generate a large number of ideas for further refinement and development.",
    name: "Brainstorming",
    in_use: false,
    id: "TermId",
    name_for_human: "Brainstorming",
    name_for_ai: "Brainstorming",
    description_for_human: "",
    description_for_ai: "",
    is_configurable: false,
    config_elements: [],
    config_json: {}, prompt_template: ""
  },
  {
    type: "Longtail keywords",
    description:
      "Highly specific search phrases used to help startup target niche audiences and optimize SEO.",
    name: "Longtail keywords",
    in_use: false,
    id: "TermId",
    name_for_human: "Longtail keywords",
    name_for_ai: "Longtail keywords",
    description_for_human: "",
    description_for_ai: "",
    is_configurable: false,
    config_elements: [],
    config_json: {}, prompt_template: ""
  },  
  {
    type: "Market sizing",
    description:
      "Estimating the potential market for a startup's product or service.",
    name: "Market sizing",
    in_use: false,
    id: "TermId",
    name_for_human: "Market sizing",
    name_for_ai: "Market sizing",
    description_for_human: "",
    description_for_ai: "",
    is_configurable: false,
    config_elements: [],
    config_json: {}, prompt_template: ""
  },
  {
    type: "Competitor research",
    description:
      "Analyzing the strengths and weaknesses of direct and indirect competitors.",
    name: "Competitor research",
    in_use: false,
    id: "TermId",
    name_for_human: "Competitor research",
    name_for_ai: "Competitor research",
    description_for_human: "",
    description_for_ai: "",
    is_configurable: false,
    config_elements: [],
    config_json: {}, prompt_template: ""
  },
  {
    type: "Topic research",
    description:
      "Examining trending topics and themes across a startup's industry.",
    name: "Topic research",
    in_use: false,
    id: "TermId",
    name_for_human: "Topic research",
    name_for_ai: "Topic research",
    description_for_human: "",
    description_for_ai: "",
    is_configurable: false,
    config_elements: [],
    config_json: {}, prompt_template: ""
  },
  {
    type: "Product research",
    description:
      "Assessing the viability and potential of a startup's product idea.",
    name: "Product research",
    in_use: false,
    id: "TermId",
    name_for_human: "Product research",
    name_for_ai: "Product research",
    description_for_human: "",
    description_for_ai: "",
    is_configurable: false,
    config_elements: [],
    config_json: {}, prompt_template: ""
  },
  {
    type: "Influencer research",
    description:
      "Identifying influential individuals or brands within a target market to support outreach and marketing efforts.",
    name: "Influencer research",
    in_use: false,
    id: "TermId",
    name_for_human: "Influencer research",
    name_for_ai: "Influencer research",
    description_for_human: "",
    description_for_ai: "",
    is_configurable: false,
    config_elements: [],
    config_json: {}, prompt_template: ""
  },
  {
    type: "Event research",
    description:
      "Exploring industry-specific events and conferences to learn from and connect with industry leaders.",
    name: "Event research",
    in_use: false,
    id: "TermId",
    name_for_human: "Event research",
    name_for_ai: "Event research",
    description_for_human: "",
    description_for_ai: "",
    is_configurable: false,
    config_elements: [],
    config_json: {}, prompt_template: ""
  },
  {
    type: "Technology research",
    description:
      "Evaluating the effectiveness and potential of new and existing technology in the context of a startup's needs.",
    name: "Technology research",
    in_use: false,
    id: "TermId",
    name_for_human: "Technology research",
    name_for_ai: "Technology research",
    description_for_human: "",
    description_for_ai: "",
    is_configurable: false,
    config_elements: [],
    config_json: {}, prompt_template: ""
  },
];

/* OF COURSE THIS WOULD BE LOADED FROM A DB, AFTER THE USER HAS SELECTED WHICH STARUP THEY AREA WORKING ON */
const startupDescription = `FutureBike: Changing the Future of Transportation

FutureBike is an innovative startup focused on transforming the way people commute in urban areas. Leveraging breakthrough technologies in AI and eco-friendly materials, FutureBike aims to provide clean, affordable, and efficient transportation solutions.

The Problem

Urban areas are faced with rising air pollution, traffic congestion, and inadequate public transportation systems. These issues pose significant environmental, health, and economic challenges to both individuals and society at large. FutureBike is committed to addressing these challenges and providing sustainable, affordable, and efficient solutions.

The Solution

FutureBike is building a range of electric bicycles and scooters that are designed to cater to different riding needs. Their bikes are powered by AI-driven motors and eco-friendly batteries, ensuring that riders can enjoy a clean ride without having to worry about carbon emissions.

The bikes and scooters are stylish, lightweight, and have a long battery life, making them an ideal choice for commuting in urban areas. FutureBike is leveraging the latest advancements in AI technology to improve the safety and efficiency of their bikes further. Their advanced safety features such as automatic braking and collision avoidance software help riders stay safe while on the road.

Market Strategies & Practices

FutureBike's success in the market is primarily driven by its focus on innovation, efficiency, and sustainability. The company is actively working to reduce its carbon footprint by sourcing eco-friendly materials and implementing green practices in their manufacturing processes. Their bikes and scooters are priced competitively, making them a cost-effective alternative to traditional modes of transportation.

The company has built robust partnerships with local governments, advocacy groups, and other stakeholders to promote sustainable transportation solutions. The company also offers bike-sharing services in urban areas, enabling more people to enjoy the clean and efficient ride that their bikes offer.

Investment Opportunities

FutureBike represents an exciting opportunity for investors interested in sustainable transportation solutions. With the rise of environmental concerns and increasing demand for eco-friendly mobility options, FutureBike is well-positioned to become a leading player in the market.

The company has a clear growth strategy, built around expanding its product line and building strategic partnerships. With their focus on innovation and sustainability, FutureBike has the potential to capture a significant market share and generate substantial returns for investors.`;

const ConnectorsTab: React.FC = () => {
  const [selectedConnectors, setSelectedConnectors] = useState<Connector[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentConnector, setCurrentConnector] = useState<Connector | null>(
    null,
  );
  const [showConfigureModal, setShowConfigureModal] = useState(false); // State to control the visibility of the configure modal

  const [config, setConfig] = useState<Record<string, any>>(
    currentConnector?.config_json || {},
  );

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
    setCurrentConnector(connector);
    //------------------------------------------------ START OF AGENT CODE HERE ----------------------------------------------------------------------
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
          <div className="w-full overflow-hidden shadow-xl md:rounded-2xl md:border md:border-gray-200">
            <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
              <h3 className="font-display text-2xl font-bold">
                Task {currentConnector?.name} AutoGPT result
              </h3>
              <img
                src="/longtail.gif"
                width="735px"
                height="309px"
                alt="longtail"
              />
              {currentConnector?.config_elements.map((element) => (
                <ConfigElementRenderer
                  key={
                    element.type === "setting"
                      ? (element as ConfigSetting).id
                      : element.text
                  }
                  element={element}
                  config={config}
                  onUpdate={(updatedConfig) => setConfig(updatedConfig)}
                />
              ))}{" "}
              <button
                className="mt-4 rounded bg-blue-500 py-1 px-2 text-white"
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
