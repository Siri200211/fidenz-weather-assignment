import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import WeatherTable from "../components/WeatherTable";
import CityComfortChart from "../components/CityComfortChart";
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

  const [selectedCity, setSelectedCity] = useState("");
  const [cityTrends, setCityTrends] = useState({});

  const [theme, setTheme] = useState("dark");

  /* FILTER & SORT*/
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

  /*FETCH WEATHER DATA*/
  useEffect(() => {
    if (!isAuthenticated) return;

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

    const interval = setInterval(fetchWeather, 5000); // every 5 sec

    return () => clearInterval(interval);
  }, [isAuthenticated, getAccessTokenSilently]);


  /*BUILD REAL TRENDS */
  useEffect(() => {
    if (!weather.length) return;

    setCityTrends((prev) => {
      const updated = { ...prev };

      weather.forEach((city) => {
        const lastEntry = updated[city.city]?.slice(-1)[0];


        if (lastEntry && lastEntry.comfort === city.comfortScore) {
          return;
        }

        const time = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        });

        if (!updated[city.city]) {
          updated[city.city] = [];
        }

        updated[city.city] = [
          ...updated[city.city],
          { time, comfort: city.comfortScore }
        ].slice(-12);
      });

      return updated;
    });
  }, [weather]);




  /*LOGIN PAGE*/
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
            <p>Discover the most comfortable cities using real-time weather data.</p>

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

  /* DASHBOARD*/
  return (
    <div
      className={`dashboard-bg ${theme}`}
      style={{ backgroundImage: `url(${dashboardBg})` }}
    >
      <div className="dashboard-overlay">
        <div className="dashboard-layout">
          <Header theme={theme} setTheme={setTheme} />


          <div className="dashboard-card">
            {/* Search */}
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by city..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="search-btn">🔍</button>
            </div>

            {/* Table */}
            <WeatherTable
              weather={sortedWeather}
              sortBy={sortBy}
              sortOrder={sortOrder}
              setSortBy={setSortBy}
              setSortOrder={setSortOrder}
              setSelectedCity={setSelectedCity}
            />


            {/* City Selector */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              style={{
                marginTop: "20px",
                padding: "8px",
                borderRadius: "6px",
                width: "100%"
              }}
            >
              <option value="">Select a city to view trend</option>
              {weather.map((city) => (
                <option key={city.city} value={city.city}>
                  {city.city}
                </option>
              ))}
            </select>

            {/* Graph */}
            {selectedCity && cityTrends[selectedCity] && (
              <CityComfortChart
                city={selectedCity}
                data={cityTrends[selectedCity]}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
