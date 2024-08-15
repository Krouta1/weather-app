"use client";
import { useGlobalContext, Weather } from "@/app/context/globalContext";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  navigation,
  rain,
  snow,
} from "@/app/utils/icons";
import { kelvinToCelsius } from "@/app/utils/mics";
import moment from "moment";
import React, { use, useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

const Temperature = () => {
  const { forecast } = useGlobalContext();
  const { weather, timezone, name, main } = forecast;

  //state
  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  const weatherInfo = weather?.[0];

  // get icon
  const getIcon = () => {
    switch (weatherInfo?.main) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };

  //live time update
  useEffect(() => {
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone ?? 0 / 60);

      const formatedTime = localMoment.format("HH:mm:ss");

      const day = localMoment.format("dddd");

      setLocalTime(formatedTime);
      setCurrentDay(day);
    }, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  //guard for skeleton
  if (!forecast || !weather) {
    return <Skeleton className="col-span-2 h-[12rem] w-full md:col-span-4" />;
  }

  //temperature
  const temp = kelvinToCelsius(main?.temp);
  const minTemp = kelvinToCelsius(main?.temp_min);
  const maxTemp = kelvinToCelsius(main?.temp_max);

  return (
    <div className="flex flex-col justify-between rounded-lg border px-4 pb-5 pt-6 shadow-sm dark:bg-dark-gray dark:shadow-none">
      <p className="flex items-center justify-between">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{localTime}</span>
      </p>
      <p className="flex items-center gap-1 py-10 pt-2 font-bold">
        <span>{name}</span>
        <span>{navigation}</span>
      </p>
      <p className="self-center py-10 text-9xl font-bold">{temp}°</p>
      <div>
        <div>
          <span>{getIcon()}</span>
          <p className="pt-2 text-lg font-medium capitalize">
            {weatherInfo?.description}
          </p>
        </div>
        <p className="flex items-center gap-2">
          <span>
            Low: <strong>{minTemp}°</strong>
          </span>
          <span>
            High: <strong>{maxTemp}°</strong>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Temperature;
