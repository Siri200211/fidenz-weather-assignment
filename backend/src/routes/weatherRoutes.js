import express from "express";
import { fetchWeatherData } from "../services/weatherService.js";
import { calculateComfortIndex } from "../utils/comfortIndex.js";
import { weatherCache } from "../cache/weatherCache.js";
import { checkJwt } from "../middleware/auth.js";


const router = express.Router();

router.get("/comfort", checkJwt , async (req, res) => {
  try {
    const { data, cacheStatus } = await fetchWeatherData();

    const processed = data.map((city) => ({
      city: city.name,
      temperature: city.main.temp,
      description: city.weather[0].description,
      comfortScore: calculateComfortIndex(city)
    }));

    processed.sort((a, b) => b.comfortScore - a.comfortScore);

    res.json({
      cache: cacheStatus,
      results: processed
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

router.get("/cache-status", checkJwt, (req, res) => {
  res.json({
    weatherCacheKeys: weatherCache.keys(),
    stats: weatherCache.getStats()
  });
});


export default router;
