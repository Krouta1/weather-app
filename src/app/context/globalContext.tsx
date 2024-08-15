"use client";

import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import defaultCountries from "../utils/default-countries";
import { debounce } from "lodash";

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
  uvIndex: any;
  geoCodedList: any;
  inputValue: any;
  handleInput: (e: Event) => void;
}

interface GlobalContextUpdateType {
  setForecast: React.Dispatch<React.SetStateAction<Forecast>>;
  setPollution: React.Dispatch<React.SetStateAction<Pollution>>;
  setFiveDayForecast: React.Dispatch<React.SetStateAction<any>>;
  setUvIndex: React.Dispatch<React.SetStateAction<any>>;
  setGeoCodedList: React.Dispatch<React.SetStateAction<any>>;
  setInputValue: React.Dispatch<React.SetStateAction<any>>;
  setActiveCityCoords: React.Dispatch<React.SetStateAction<any>>;
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
  const [forecast, setForecast] = useState({});
  const [geoCodedList, setGeoCodedList] = useState(defaultCountries);
  const [inputValue, setInputValue] = useState("");

  const [activeCityCoords, setActiveCityCoords] = useState([
    51.752021, -1.257726,
  ]);

  const [pollution, setPollution] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});
  const [uvIndex, setUvIndex] = useState({});

  const fetchForecast = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);

      setForecast(res.data);
    } catch (error: any) {
      console.log("Error fetching forecast data: ", error.message);
    }
  };

  // Air Quality
  const fetchAirQuality = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
      setPollution(res.data);
    } catch (error: any) {
      console.log("Error fetching air quality data: ", error.message);
    }
  };

  // five day forecast
  const fetchFiveDayForecast = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`);

      setFiveDayForecast(res.data);
    } catch (error: any) {
      console.log("Error fetching five day forecast data: ", error.message);
    }
  };

  //geocoded list
  const fetchGeoCodedList = async (search: string) => {
    try {
      const res = await axios.get(`/api/geocoded?search=${search}`);

      setGeoCodedList(res.data);
    } catch (error: any) {
      console.log("Error fetching geocoded list: ", error.message);
    }
  };

  //fetch uv data
  const fetchUvIndex = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);

      setUvIndex(res.data);
    } catch (error) {
      console.error("Error fetching the forecast:", error);
    }
  };

  // handle input
  const handleInput = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      setInputValue(e.target.value);

      if (e.target.value === "") {
        setGeoCodedList(defaultCountries);
      }
    }
  };

  // debounce function
  useEffect(() => {
    const debouncedFetch = debounce((search: string) => {
      fetchGeoCodedList(search);
    }, 500);

    if (inputValue) {
      debouncedFetch(inputValue);
    }

    // cleanup
    return () => debouncedFetch.cancel();
  }, [inputValue]);

  useEffect(() => {
    fetchForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
    fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
  }, [activeCityCoords]);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        pollution,
        fiveDayForecast,
        uvIndex,
        geoCodedList,
        inputValue,
        handleInput,
      }}
    >
      <GlobalContextUpdate.Provider
        value={{
          setForecast,
          setPollution,
          setFiveDayForecast,
          setUvIndex,
          setGeoCodedList,
          setInputValue,
          setActiveCityCoords,
        }}
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
