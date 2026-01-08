import "../App.css";

function WeatherTable({ weather }) {
  const scoreClass = (score) => {
    if (score >= 70) return "score-high";
    if (score >= 50) return "score-medium";
    return "score-low";
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>City</th>
          <th>Temperature (°C)</th>
          <th>Condition</th>
          <th>Comfort Score</th>
        </tr>
      </thead>

      <tbody>
        {weather.map((city, index) => (
          <tr key={city.city}>
            <td data-label="Rank">{index + 1}</td>

            <td data-label="City">{city.city}</td>

            <td data-label="Temperature">
              {city.temperature.toFixed(1)}
            </td>

            <td data-label="Condition">
              {city.description}
            </td>

            <td data-label="Comfort Score">
              <span className={`badge ${scoreClass(city.comfortScore)}`}>
                {city.comfortScore}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default WeatherTable;
