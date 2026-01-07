export function calculateComfortIndex(weather) {
  const temp = weather.main.temp;        // °C
  const humidity = weather.main.humidity; // %
  const wind = weather.wind.speed;        // m/s

  let score = 100;

  // Temperature penalty
  if (temp < 18 || temp > 30) {
    score -= Math.abs(24 - temp) * 2;
  }

  // Humidity penalty
  if (humidity < 40 || humidity > 60) {
    score -= Math.abs(50 - humidity) * 0.5;
  }

  // Wind penalty
  if (wind > 5) {
    score -= (wind - 5) * 2;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}
