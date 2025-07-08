import axios from "axios";
import { WeatherResponse, WeatherResponseSchema } from "../types";
import { safeFetch } from "../helpers";
import dotenv from "dotenv";
dotenv.config();
export async function getWeatherByCity(city: string) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  return await safeFetch(
    async () => {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data: WeatherResponse = WeatherResponseSchema.parse(res.data);

      return {
        temperature: data.main.temp,
        description: data.weather[0].description,
      };
    },
    null,
    `Weather for city '${city}'`
  );
}
