export function calculateComfortIndex(weather) {
  const temp = weather.main.temp;
  const humidity = weather.main.humidity;
  const wind = weather.wind.speed;

  let score = 100;

  if (temp < 18 || temp > 30) {
    score -= Math.abs(24 - temp) * 2;
  }

  if (humidity < 40 || humidity > 60) {
    score -= Math.abs(50 - humidity) * 0.5;
  }

  if (wind > 5) {
    score -= (wind - 5) * 2;
  }

  if (score < 0) score = 0;

  return Math.round(score);
}
