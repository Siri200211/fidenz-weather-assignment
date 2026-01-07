import axios from "axios";
import fs from "fs";
import { weatherCache } from "../cache/weatherCache.js";

const rawData = JSON.parse(fs.readFileSync("cities.json"));
const cities = rawData.List;

const CACHE_KEY = "RAW_WEATHER_DATA";

export async function fetchWeatherData() {
  
  const cachedData = weatherCache.get(CACHE_KEY);
  if (cachedData) {
    return { data: cachedData, cacheStatus: "HIT" };
  }

 
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const results = [];

  for (const city of cities) {
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${city.CityCode}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    results.push(response.data);
  }


  weatherCache.set(CACHE_KEY, results);

  return { data: results, cacheStatus: "MISS" };
}
