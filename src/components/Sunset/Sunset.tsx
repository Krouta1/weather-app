"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from "../ui/skeleton";
import { unixToTime } from "@/app/utils/mics";
import { sunset as SunsetIcon } from "@/app/utils/icons";

const Sunset = () => {
  const { forecast } = useGlobalContext();

  if (!forecast) return <Skeleton className="h-[12rem] w-full" />;

  const sunset = forecast?.sys?.sunset;
  const sunrise = forecast?.sys?.sunrise;
  const timezone = forecast?.timezone;

  if (sunset === undefined || timezone === undefined || sunrise === undefined) {
    return null;
  }

  const sunsetTime = unixToTime(sunset, timezone);
  const sunriseTime = unixToTime(sunrise, timezone);

  return (
    <div className="flex h-[12rem] flex-col gap-8 rounded-lg border px-4 pb-5 pt-6 shadow-sm dark:bg-dark-gray dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {SunsetIcon}Sunset
        </h2>
        <p className="pt-4 text-2xl">{sunsetTime}</p>
      </div>
      <p>Sunrise: {sunriseTime}</p>
    </div>
  );
};

export default Sunset;
