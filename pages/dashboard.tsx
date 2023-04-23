// pages/dashboard.tsx
import RetrieverPluginModal from "@/components/home/retriever-plugin-modal";
import OverviewTab from "@/components/tabs/overview-tab";
import ConnectorsTab from "@/components/tabs/connectors-tab";
import ChatTab from "@/components/tabs/chat-tab";
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const [isRetrieverPluginModalOpen, setIsRetrieverPluginModalOpen] =
    useState(false);

  // State variable to keep track of the currently selected tab
  const [selectedTab, setSelectedTab] = useState("overview");
  const { data: session, status } = useSession();
  const router = useRouter();

  // State variable to control the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseRetrieverPluginModal = () => {
    setIsRetrieverPluginModalOpen(false);
  };

  // Function to handle tab click
  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName);
  };

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  // Show a loading message while checking the session status
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="mt-12 container flex min-h-screen max-w-screen-xl flex-col">
        {/* Tab navigation bar with semi-transparent white background */}
        <div className="flex border-b border-gray-300">
          <a
            className={`cursor-pointer py-2 px-6 ${
              selectedTab === "overview"
                ? "border-b-2 border-gray-900 font-medium"
                : ""
            }`}
            onClick={() => handleTabClick("overview")}
          >
            Overview
          </a>
          <a
            className={`cursor-pointer py-2 px-6 ${
              selectedTab === "connectors"
                ? "border-b-2 border-gray-900 font-medium"
                : ""
            }`}
            onClick={() => handleTabClick("connectors")}
          >
            AutoGPT Tasks
          </a>
          <a
            className={`cursor-pointer py-2 px-6 ${
              selectedTab === "chat"
                ? "border-b-2 border-gray-900 font-medium"
                : ""
            }`}
            onClick={() => handleTabClick("chat")}
          >
            Chat
          </a>
        </div>

        {/* Conditionally render tab content with blurred glass effect and drop shadow */}
        <div className="flex-grow bg-white bg-opacity-90 shadow-lg backdrop-blur-md">
          <div key={selectedTab}>
            {selectedTab === "overview" && (
              <OverviewTab
                onTabChange={handleTabClick}
                onOpenModal={handleOpenModal}
              />
            )}
            {selectedTab === "connectors" && <ConnectorsTab />}
            {selectedTab === "chat" && <ChatTab />}
            {isModalOpen && (
              <RetrieverPluginModal
                isOpen={isRetrieverPluginModalOpen}
                onClose={handleCloseRetrieverPluginModal}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
