// components/RetrieverPluginModal.tsx

import React from "react";
import Modal from "react-modal";

interface RetrieverPluginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RetrieverPluginModal: React.FC<RetrieverPluginModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed top-1/2 left-1/2 w-11/12 max-w-2xl -translate-x-1/2 -translate-y-1/2 transform rounded bg-white p-4 shadow-md md:w-1/2"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="mb-4 text-lg font-semibold">
        Retriever Plugin for ChatGPT
      </h2>
      <p>
        This is the content of the modal. You can add information about the
        retriever plugin for ChatGPT here.
      </p>
      <div className="mt-4 flex justify-end">
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default RetrieverPluginModal;
