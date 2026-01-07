import axios from "axios";
import fs from "fs";

const rawData = JSON.parse(fs.readFileSync("cities.json"));
const cities = rawData.List; // 👈 important change

export async function fetchWeatherData() {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const results = [];

  for (const city of cities) {
    const cityId = city.CityCode;

    const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    results.push(response.data);
  }

  return results;
}
