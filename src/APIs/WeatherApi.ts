// src/apis/weather.ts
import axios from "axios";
import dotenv from "dotenv";
import { WeatherResponse, WeatherResponseSchema } from "../types";
dotenv.config();

const apiKey = process.env.OPENWEATHER_API_KEY;

export async function getWeatherByCity(city: string) {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  const data: WeatherResponse = WeatherResponseSchema.parse(res.data);

  return {
    temperature: data.main.temp,
    description: data.weather[0].description,
  };
}
