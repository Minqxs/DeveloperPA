import axios from "axios";
import dotenv from "dotenv";
import { WeatherResponse, WeatherResponseSchema } from "../types";
dotenv.config();

export async function getWeatherByCity(city: string) {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=72a85177bdbd744c204b23546c489a7a&units=metric`
  );
  const data: WeatherResponse = WeatherResponseSchema.parse(res.data);

  return {
    temperature: data.main.temp,
    description: data.weather[0].description,
  };
}
