import AirPollution from "@/components/AirPollution/AirPollution";
import DailyForecast from "@/components/DailyForecast/DailyForecast";
import FeelsLike from "@/components/FeelsLike/FeelsLike";
import Humidity from "@/components/Humidity/Humidity";
import Navbar from "@/components/Navbar";
import Population from "@/components/Population/Population";
import Sunset from "@/components/Sunset/Sunset";
import Temperature from "@/components/Temperature/Temperature";
import UvIndex from "@/components/UvIndex/UvIndex";
import Wind from "@/components/Wind/Wind";

export default function Home() {
  return (
    <main className="m-auto mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem]">
      <Navbar />
      <div className="flex flex-col gap-4 pb-4 md:flex-row">
        <div className="flex w-full min-w-[18rem] flex-col gap-4 md:w-[35rem]">
          <Temperature />
          {/* <FiveDayForecast /> */}
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
            {/* <Visibility /> */}
            {/* <Pressure /> */}
          </div>
        </div>
      </div>
    </main>
  );
}
