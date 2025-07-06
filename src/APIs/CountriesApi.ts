import axios from "axios";
import { Country, CountrySchema } from "../types";

export async function getCountryInfo(countryName: string) {
  const res = await axios.get(
    `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
  );
  const country: Country = CountrySchema.parse(res.data[0]);

  return {
    city: country.capital?.[0] || null,
    country: country.name.common,
  };
}
