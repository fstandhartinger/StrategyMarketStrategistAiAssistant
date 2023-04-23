// components/shared/ConnectorCard.tsx
import React from 'react';
import { Connector } from '@/interfaces/connector';

interface ConnectorCardProps {
  connector: Connector;
  onAdd: (connector: Connector) => void;
}

const ConnectorCard: React.FC<ConnectorCardProps> = ({ connector, onAdd }) => {
  return (
    <div className="flex w-60 flex-col rounded-lg border bg-gray-300 p-4">
      <h2 className="text-xl font-semibold">{connector.type}</h2>
      <p className="flex-1 text-sm">{connector.description}</p>
      <button className="mt-2 rounded bg-gray-500 py-1 px-2 text-white" onClick={() => onAdd(connector)}>
        Add
      </button>
    </div>
  );
};

export default ConnectorCard;
