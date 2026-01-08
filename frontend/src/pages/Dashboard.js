/*import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

function Dashboard() {
  const { logout, getAccessTokenSilently } = useAuth0();
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      const token = await getAccessTokenSilently();

      const response = await fetch(
        "http://localhost:5000/api/weather/comfort",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();
      setWeather(data.results);
    };

    fetchWeather();
  }, [getAccessTokenSilently]);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Weather Comfort Dashboard</h2>

      <button
  onClick={() =>
    logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    })
  }
  style={{ marginBottom: "20px" }}
>
  Logout
</button>


      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Rank</th>
            <th>City</th>
            <th>Temperature (°C)</th>
            <th>Description</th>
            <th>Comfort Score</th>
          </tr>
        </thead>
        <tbody>
          {weather.map((city, index) => (
            <tr key={city.city}>
              <td>{index + 1}</td>
              <td>{city.city}</td>
              <td>{city.temperature}</td>
              <td>{city.description}</td>
              <td>{city.comfortScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
*/