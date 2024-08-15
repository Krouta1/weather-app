"use client";

import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Coord {
  lon: number;
  lat: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  country: string;
  sunrise: number;
  sunset: number;
}

export interface Forecast {
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

export interface Coord {
  lon: number;
  lat: number;
}

export interface Main {
  aqi: number;
}

interface Components {
  co: number;
  no: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  nh3: number;
}

interface List {
  main: Main;
  components: Components;
  dt: number;
}

interface Pollution {
  coord?: Coord;
  list?: List[];
}

interface GlobalContextType {
  forecast: Forecast; // Example property
  pollution: Pollution;
  fiveDayForecast: any;
}

interface GlobalContextUpdateType {
  setForecast: React.Dispatch<React.SetStateAction<Forecast>>;
  setPollution: React.Dispatch<React.SetStateAction<Pollution>>;
  setFiveDayForecast: React.Dispatch<React.SetStateAction<any>>;
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
  const [pollution, setPollution] = useState<Pollution>({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});

  const fetchForecast = async () => {
    try {
      const response = await axios.get("/api/weather");
      setForecast(response.data);
    } catch (error) {
      console.log("Error fetching forecast data: ", error);
    }
  };

  const fetchPollution = async () => {
    try {
      const response = await axios.get("/api/pollution");
      setPollution(response.data);
    } catch (error) {
      console.log("Error fetching pollution data: ", error);
    }
  };

  const fetchFiveDayForecast = async () => {
    try {
      const res = await axios.get(`api/fiveday`);

      setFiveDayForecast(res.data);
    } catch (error: any) {
      console.log("Error fetching five day forecast data: ", error.message);
    }
  };

  useEffect(() => {
    fetchForecast();
    fetchPollution();
    fetchFiveDayForecast();
  }, []);

  return (
    <GlobalContext.Provider value={{ forecast, pollution, fiveDayForecast }}>
      <GlobalContextUpdate.Provider
        value={{ setForecast, setPollution, setFiveDayForecast }}
      >
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
