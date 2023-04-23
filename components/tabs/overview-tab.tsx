import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog";
import { useSession } from "next-auth/react"; // Import useSession hook
import RetrieverPluginModal from "../home/retriever-plugin-modal";

interface OverviewTabProps {
  onTabChange: (tabName: string) => void;
  onOpenModal?: () => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  onTabChange,
  onOpenModal,
}) => {
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
      <div className="border border-slate-700 max-w-xl mt-2">
        <div className="prose flex-1 dark:prose-invert">
          <p>
            <strong>FutureBike: Changing the Future of Transportation</strong>
          </p>
          <p>
            FutureBike is an innovative startup focused on transforming the way
            people commute in urban areas. Leveraging breakthrough technologies
            in AI and eco-friendly materials, FutureBike aims to provide clean,
            affordable, and efficient transportation solutions.
          </p>
          <p>
            <strong>The Problem</strong>
          </p>
          <p>
            Urban areas are faced with rising air pollution, traffic congestion,
            and inadequate public transportation systems. These issues pose
            significant environmental, health, and economic challenges to both
            individuals and society at large. FutureBike is committed to
            addressing these challenges and providing sustainable, affordable,
            and efficient solutions.
          </p>
          <p>
            <strong>The Solution</strong>
          </p>
          <p>
            FutureBike is building a range of electric bicycles and scooters
            that are designed to cater to different riding needs. Their bikes
            are powered by AI-driven motors and eco-friendly batteries, ensuring
            that riders can enjoy a clean ride without having to worry about
            carbon emissions.
          </p>
          <p>
            The bikes and scooters are stylish, lightweight, and have a long
            battery life, making them an ideal choice for commuting in urban
            areas. FutureBike is leveraging the latest advancements in AI
            technology to improve the safety and efficiency of their bikes
            further. Their advanced safety features such as automatic braking
            and collision avoidance software help riders stay safe while on the
            road.
          </p>
          <p>
            <strong>Market Strategies &amp; Practices</strong>
          </p>
          <p>
            FutureBike&apos;s success in the market is primarily driven by its focus
            on innovation, efficiency, and sustainability. The company is
            actively working to reduce its carbon footprint by sourcing
            eco-friendly materials and implementing green practices in their
            manufacturing processes. Their bikes and scooters are priced
            competitively, making them a cost-effective alternative to
            traditional modes of transportation.
          </p>
          <p>
            The company has built robust partnerships with local governments,
            advocacy groups, and other stakeholders to promote sustainable
            transportation solutions. The company also offers bike-sharing
            services in urban areas, enabling more people to enjoy the clean and
            efficient ride that their bikes offer.
          </p>
          <p>
            <strong>Investment Opportunities</strong>
          </p>
          <p>
            FutureBike represents an exciting opportunity for investors
            interested in sustainable transportation solutions. With the rise of
            environmental concerns and increasing demand for eco-friendly
            mobility options, FutureBike is well-positioned to become a leading
            player in the market.
          </p>
          <p>
            The company has a clear growth strategy, built around expanding its
            product line and building strategic partnerships. With their focus
            on innovation and sustainability, FutureBike has the potential to
            capture a significant market share and generate substantial returns
            for investors.
          </p>
        </div>{" "}
      </div>
    </div>
  );
};

export default OverviewTab;
