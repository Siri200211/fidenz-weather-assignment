import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

function App() {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently
  } = useAuth0();

  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    if (isAuthenticated) {
      fetchWeather();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Fidenz Weather Dashboard</h2>

      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>
          Login
        </button>
      )}

      {isAuthenticated && (
        <>
          <button onClick={() => logout()} style={{ marginBottom: "20px" }}>
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
        </>
      )}
    </div>
  );
}

export default App;
