// components/StartupSelector.tsx
import React from 'react';
import { useStartupContext } from '../../contexts/StartupContext';

const StartupSelector: React.FC = () => {
  const { startups, setSelectedStartupByName } = useStartupContext();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStartupByName(event.target.value);
  };

  return (
    <select onChange={handleChange} className='text-black w-80'>
      <option value="">Select a startup</option>
      {startups.map((startup) => (
        <option key={startup.name} value={startup.name}>
          {startup.name}
        </option>
      ))}
    </select>
  );
};

export default StartupSelector;
