import React, { createContext, useState, useContext, useEffect } from 'react';

interface Startup {
  name: string;
  description: string;
}

interface StartupContextValue {
  startups: Startup[];
  selectedStartup: Startup | null;
  setSelectedStartupByName: (startupName: string) => void;
}

const StartupContext = createContext<StartupContextValue>({
  startups: [],
  selectedStartup: null,
  setSelectedStartupByName: () => {},
});

export const useStartupContext = () => useContext(StartupContext);

export const StartupProvider: React.FC<{
    children?: React.ReactNode;
}> = ({ children }) => {

  const [startups, setStartups] = useState<Startup[]>([]);
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);

  useEffect(() => {
    // Fetch the list of startups from the JSON file in the public folder
    fetch('/startups.json')
      .then((response) => response.json())
      .then((data) => setStartups(data));
  }, []);

  const setSelectedStartupByName = (startupName: string) => {
    const startup = startups.find((startup) => startup.name === startupName);
    setSelectedStartup(startup || null);
  };

  return (
    <StartupContext.Provider value={{ startups, selectedStartup, setSelectedStartupByName }}>
      {children}
    </StartupContext.Provider>
  );
};
