"use client";

import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface Coord {
  lon: number;
  lat: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Clouds {
  all: number;
}

interface Sys {
  country: string;
  sunrise: number;
  sunset: number;
}

interface Forecast {
  coord?: Coord;
  weather?: Weather[];
  base?: string;
  main?: Main;
  visibility?: number;
  wind?: Wind;
  clouds?: Clouds;
  dt?: number;
  sys?: Sys;
  timezone?: number;
  id?: number;
  name?: string;
  cod?: number;
}

interface GlobalContextType {
  forecast: Forecast; // Example property
}

interface GlobalContextUpdateType {
  setForecast: React.Dispatch<React.SetStateAction<Forecast>>;
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
  const [forecast, setForecast] = useState<Forecast>({});

  const fetchForecast = async () => {
    try {
      const response = await axios.get("/api/weather");
      console.log(response);
    } catch (error) {
      console.log("Error fetching forecast data: ", error);
    }
  };

  useEffect(() => {
    fetchForecast();
  }, []);

  return (
    <GlobalContext.Provider value={{ forecast }}>
      <GlobalContextUpdate.Provider value={{ setForecast }}>
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
