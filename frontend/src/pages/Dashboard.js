import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import WeatherTable from "../components/WeatherTable";
import "../App.css";

// Images
import heroImage from "../assets/weather.png.avif";
import dashboardBg from "../assets/dashboard.avif";

function Dashboard() {
  const { isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useAuth0();
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

    if (isAuthenticated) {
      fetchWeather();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  /* ---------- BEFORE LOGIN (Landing / Hero Section) ---------- */
  if (!isAuthenticated) {
    return (
      <div className="container">
        <div
          className="hero"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="hero-overlay">
            <h1>Weather Comfort Analytics</h1>
            <p>
              Discover the most comfortable cities using real-time weather data.
            </p>
            <button
              className="btn-primary"
              onClick={() => loginWithRedirect()}
            >
              Login to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- AFTER LOGIN (Dashboard) ---------- */
  return (
    <div
      className="dashboard-bg"
      style={{ backgroundImage: `url(${dashboardBg})` }}
    >
      <div className="dashboard-overlay">
        <div className="container dashboard-layout">
           <Header />

           <div className="dashboard-card">
              <WeatherTable weather={weather} />
           </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
