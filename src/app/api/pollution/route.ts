import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const lat = 40.4165;
    const lon = -3.7026;
    const API_KEY = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    const res = await axios.get(url);
    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Error fetching forecast data: ", error);
    return new Response("Error fetching forecast data", {
      status: 500,
    });
  }
}
