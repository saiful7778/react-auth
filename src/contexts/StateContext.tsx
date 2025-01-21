import { createContext } from "react";

interface StateContextProps {
  data: string;
}

const StateContext = createContext<StateContextProps | null>(null);

const StateContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <StateContext.Provider value={{ data: "data" }}>
      {children}
    </StateContext.Provider>
  );
};

export { StateContextProvider, StateContext };
