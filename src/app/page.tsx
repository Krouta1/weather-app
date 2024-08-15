"use client";
import AirPollution from "@/components/AirPollution/AirPollution";
import DailyForecast from "@/components/DailyForecast/DailyForecast";
import FeelsLike from "@/components/FeelsLike/FeelsLike";
import FiveDayForecast from "@/components/FiveDayForecast/FiveDayForecast";
import Humidity from "@/components/Humidity/Humidity";
import Mapbox from "@/components/Mapbox/Mapbox";
import Navbar from "@/components/Navbar";
import Population from "@/components/Population/Population";
import Pressure from "@/components/Pressure/Pressure";
import Sunset from "@/components/Sunset/Sunset";
import Temperature from "@/components/Temperature/Temperature";
import UvIndex from "@/components/UvIndex/UvIndex";
import Visibility from "@/components/Visibility/Visibility";
import Wind from "@/components/Wind/Wind";
import defaultCountries from "./utils/default-countries";
import { useGlobalContextUpdate } from "./context/globalContext";
import Image from "next/image";

export default function Home() {
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const getClickedCityCords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="m-auto mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem]">
      <Navbar />
      <div className="flex flex-col gap-4 pb-4 md:flex-row">
        <div className="flex w-full min-w-[18rem] flex-col gap-4 md:w-[35rem]">
          <Temperature />
          <FiveDayForecast />
        </div>
        <div className="flex w-full flex-col">
          <div className="instruments sm-2:col-span-2 col-span-full grid h-full gap-4 lg:grid-cols-3 xl:grid-cols-4">
            <AirPollution />
            <Sunset />
            <Wind />
            <DailyForecast />
            <UvIndex />
            <Population />
            <FeelsLike />
            <Humidity />
            <Visibility />
            <Pressure />
          </div>
          <div className="mapbox-con mt-4 flex gap-4">
            <Mapbox />
            <div className="states flex flex-1 flex-col gap-3">
              <h2 className="flex items-center gap-2 font-medium">
                Top Large Cities
              </h2>
              <div className="flex flex-col gap-4">
                {defaultCountries.map((state, index) => {
                  return (
                    <div
                      key={index}
                      className="dark:bg-dark-grey cursor-pointer rounded-lg border shadow-sm dark:shadow-none"
                      onClick={() => {
                        getClickedCityCords(state.lat, state.lon);
                      }}
                    >
                      <p className="px-6 py-4">{state.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="flex justify-center py-4 pb-8">
        <p className="footer-text flex items-center gap-1 text-sm">
          Made by
          <Image src={"/next.svg"} alt="logo" width={20} height={20} />
          <a href="/" className="font-bold text-green-300">
            Krouta
          </a>
        </p>
      </footer>
    </main>
  );
}
