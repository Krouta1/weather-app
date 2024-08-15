import AirPollution from "@/components/AirPollution/AirPollution";
import DailyForecast from "@/components/DailyForecast/DailyForecast";
import Navbar from "@/components/Navbar";
import Sunset from "@/components/Sunset/Sunset";
import Temperature from "@/components/Temperature/Temperature";
import Wind from "@/components/Wind/Wind";

export default function Home() {
  return (
    <main className="m-auto mx-4 lg:mx-8 xl:mx-24 2xl:mx-64">
      <Navbar />
      <div className="flex flex-col gap-4 pb-4 md:flex-row">
        <div className="flex w-full min-w-[18rem] flex-col gap-4 md:w-[35rem]">
          <Temperature />
        </div>
        <div className="flex w-full flex-col">
          <div className="instruments sm-2:col-span-2 col-span-full grid h-full gap-4 lg:grid-cols-3 xl:grid-cols-4">
            <AirPollution />
            <Sunset />
            <Wind />
            <DailyForecast />
          </div>
        </div>
      </div>
    </main>
  );
}
