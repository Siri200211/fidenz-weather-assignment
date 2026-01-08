export function calculateComfortIndex(weather) {
  const temperature = weather.main.temp;      // °C
  const humidity = weather.main.humidity;     // %
  const windSpeed = weather.wind.speed;       // m/s

  const IDEAL_TEMP = 24;
  const IDEAL_HUMIDITY = 50;
  const MAX_WIND = 5;

  let comfortScore = 100;

  // Temperature effect
  if (temperature < 18 || temperature > 30) {
    comfortScore -= Math.abs(IDEAL_TEMP - temperature) * 2;
  }

  // Humidity effect
  if (humidity < 40 || humidity > 60) {
    comfortScore -= Math.abs(IDEAL_HUMIDITY - humidity) * 0.5;
  }

  // Wind effect
  if (windSpeed > MAX_WIND) {
    comfortScore -= (windSpeed - MAX_WIND) * 2;
  }

  return Math.max(0, Math.min(100, Math.round(comfortScore)));
}
