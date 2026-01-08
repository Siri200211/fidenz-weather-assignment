import "../App.css";

function WeatherTable({
  weather,
  sortBy,
  sortOrder,
  setSortBy,
  setSortOrder
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

          <th>
            Temperature (°C)
            <span className="sort-arrows">
              <span onClick={() => handleSort("temperature", "asc")}>▲</span>
              <span onClick={() => handleSort("temperature", "desc")}>▼</span>
            </span>
          </th>

          <th>Condition</th>

          <th>
            Comfort Score
            <span className="sort-arrows">
              <span onClick={() => handleSort("comfort", "asc")}>▲</span>
              <span onClick={() => handleSort("comfort", "desc")}>▼</span>
            </span>
          </th>
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
