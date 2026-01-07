import express from "express";
import { fetchWeatherData } from "../services/weatherService.js";
import { calculateComfortIndex } from "../utils/comfortIndex.js";

const router = express.Router();

router.get("/comfort", async (req, res) => {
  try {
    const weatherData = await fetchWeatherData();

    const processed = weatherData.map((city) => ({
      city: city.name,
      temperature: city.main.temp,
      description: city.weather[0].description,
      comfortScore: calculateComfortIndex(city)
    }));

    processed.sort((a, b) => b.comfortScore - a.comfortScore);

    res.json(processed);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

export default router;
