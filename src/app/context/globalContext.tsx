"use client";

import { createContext, ReactNode, useContext, useState } from "react";

// Define the types for the context values
interface GlobalContextType {
  state: string; // Example property
}

interface GlobalContextUpdateType {
  setState: React.Dispatch<React.SetStateAction<GlobalContextType>>;
}

// Provide initial values for the contexts
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
const GlobalContextUpdate = createContext<GlobalContextUpdateType | undefined>(
  undefined,
);

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // Define your state and update functions here
  const [state, setState] = useState<GlobalContextType>({ state: "initial" });

  return (
    <GlobalContext.Provider value={state}>
      <GlobalContextUpdate.Provider value={{ setState }}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider",
    );
  }
  return context;
};

export const useGlobalContextUpdate = () => {
  const context = useContext(GlobalContextUpdate);
  if (context === undefined) {
    throw new Error(
      "useGlobalContextUpdate must be used within a GlobalContextProvider",
    );
  }
  return context;
};
