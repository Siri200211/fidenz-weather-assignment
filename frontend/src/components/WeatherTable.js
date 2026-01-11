import "../App.css";
import CityComfortChart from "./CityComfortChart";

function WeatherTable({
  weather,
  sortBy,
  sortOrder,
  setSortBy,
  setSortOrder,
  setSelectedCity,
  selectedCity,
  cityTrends,
  theme
}) {
  const scoreClass = (score) => {
    if (score >= 70) return "score-high";
    if (score >= 50) return "score-medium";
    return "score-low";
  };

  const handleSort = (column, order) => {
    setSortBy(column);
    setSortOrder(order);
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
          <th>Trend</th>
        </tr>
      </thead>

      <tbody>
        {weather.map((city, index) => (
          <>
            {/* MAIN ROW */}
            <tr key={city.city}>
              <td data-label="Rank">{index + 1}</td>
              <td data-label="City">{city.city}</td>
              <td data-label="Temperature" className="value-center">
                {city.temperature.toFixed(1)}°C
              </td>
              <td data-label="Condition">{city.description}</td>
              <td data-label="Comfort Score" className="value-center">
                <span className={`badge ${scoreClass(city.comfortScore)}`}>
                  {city.comfortScore}
                </span>
              </td>
              <td data-label="Trend" className="value-center">
                <button
                  className="trend-btn"
                  onClick={() =>
                    setSelectedCity(
                      selectedCity === city.city ? "" : city.city
                    )
                  }
                >
                  {selectedCity === city.city ? "Hide Chart" : "View Trend"}
                </button>
              </td>
            </tr>

            {/* EXPANDED ROW */}
            {selectedCity === city.city && cityTrends[city.city] && (
              <tr className="expanded-row">
                <td colSpan="6">
                  <CityComfortChart
                    city={city.city}
                    data={cityTrends[city.city]}
                    theme={theme}
                  />
                </td>
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
  );
}

export default WeatherTable;
