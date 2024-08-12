import Navbar from "@/components/Navbar";
import Temperature from "@/components/Temperature/Temperature";

export default function Home() {
  return (
    <main className="m-auto mx-4 lg:mx-8 xl:mx-24 2xl:mx-64">
      <Navbar />
      <div className="flex flex-col gap-4 pb-4 md:flex-row">
        <div className="flex w-full min-w-[18rem] flex-col gap-4 md:w-[35rem]">
          <Temperature />
        </div>
        <div className="flex flex-col"></div>
      </div>
    </main>
  );
}
