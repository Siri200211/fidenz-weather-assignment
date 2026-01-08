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
  const [sortBy, setSortBy] = useState("comfort");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchText, setSearchText] = useState("");


  const [theme, setTheme] = useState("dark");


  const filteredWeather = weather.filter((city) =>
    city.city.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortedWeather = [...filteredWeather].sort((a, b) => {
    let valueA, valueB;

    if (sortBy === "city") {
      valueA = a.city.toLowerCase();
      valueB = b.city.toLowerCase();
    } else if (sortBy === "temperature") {
      valueA = a.temperature;
      valueB = b.temperature;
    } else {
      valueA = a.comfortScore;
      valueB = b.comfortScore;
    }

    if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
    if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });


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

  if (!isAuthenticated) {
    return (
      <div className="container">
        <div
          className="hero"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="hero-overlay">
            <button
              className="theme-toggle"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>

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

  return (
    <div
      className={`dashboard-bg ${theme}`}
      style={{ backgroundImage: `url(${dashboardBg})` }}
    >

      <div className="dashboard-overlay">
        <div className="container dashboard-layout">
          <Header />

          <div className="dashboard-card">

            <div className="search-box">
              <input
                type="text"
                placeholder="Search by city..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="search-btn" aria-label="Search">
                🔍
              </button>
            </div>



            <WeatherTable
              weather={sortedWeather}
              sortBy={sortBy}
              sortOrder={sortOrder}
              setSortBy={setSortBy}
              setSortOrder={setSortOrder}
            />


          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
