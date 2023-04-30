import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog";
import { useSession } from "next-auth/react"; // Import useSession hook
import RetrieverPluginModal from "../home/retriever-plugin-modal";
import { useStartupContext } from '../../contexts/StartupContext';


interface OverviewTabProps {
  onTabChange: (tabName: string) => void;
  onOpenModal?: () => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  onTabChange,
  onOpenModal,
}) => {
  const { selectedStartup } = useStartupContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const { data: session } = useSession(); // Use the useSession hook to get the session object

  return (
    <div className="m-4 p-8">
      <h2 className="mb-8 bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent md:text-3xl md:font-normal">
        Welcome
      </h2>
      <h3>
        I am helping you with your strategy research for the selected startup.
      </h3>
      <h3>
        Start teams of AI agents to research certain topics in the{" "}
        <button
          className="font-medium text-gray-800 underline"
          onClick={() => onTabChange("connectors")}
        >
          AutoGPT Tasks
        </button>{" "}
        section.
      </h3>

      <h2 className="mt-8 mb-8 bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent md:text-2xl md:font-normal">
        Startup description
      </h2>
      <h3>
        This is the description of the startup you selected.
      </h3>      
      <h3>It will be the base information for your research in collaboration with the AutoGPT agents.</h3>
      <h3>
        You can edit the startup description here. (coming soon) 
      </h3>      
      <div className="max-w-2xl mt-2">
        <div className="prose flex-1 dark:prose-invert">
          <textarea className="max-w-3xl h-80 w-full textarea textarea-bordered" placeholder="Startup description - select startup first" value={selectedStartup?.description} />
     
        </div>{" "}
      </div>
    </div>
  );
};

export default OverviewTab;
