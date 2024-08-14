"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from "../ui/skeleton";
import { thermo } from "@/app/utils/icons";
import { Progress } from "../ui/progress";
import { airQulaityIndexText } from "@/app/utils/mics";

const AirPollution = () => {
  const { pollution } = useGlobalContext();

  if (!pollution || !pollution.list)
    return (
      <Skeleton className="col-span-2 h-[12rem] w-full md:col-span-full" />
    );

  const airQualityIndex = pollution?.list[0]?.main?.aqi * 10;
  const fillteredIndex = airQulaityIndexText.find((item) => {
    return item.rating === airQualityIndex;
  });

  return (
    <div className="air-pollution sm-2:col-span-2 col-span-full flex h-[12rem] flex-col gap-8 rounded-lg border px-4 pt-6 shadow-sm dark:bg-dark-gray dark:shadow-none">
      <h2 className="flex items-center gap-2 font-medium">
        {thermo}Air Pollution
      </h2>
      <Progress value={airQualityIndex} className="progress" max={100} />
      <p>Air quality is {fillteredIndex?.description || "Unknown"}. </p>
    </div>
  );
};

export default AirPollution;
