# Weather Comfort Dashboard 🌤️

A full-stack web application that analyzes real-time weather data and ranks cities using a custom Comfort Index. The system uses secure authentication, a protected backend API, and a responsive frontend dashboard.

---

## 📌 Features

- Secure login using Auth0 (MFA enabled)
- Protected backend API with JWT validation
- Real-time weather data from OpenWeather API
- City ranking based on Comfort Index
- In-memory caching to reduce external API calls
- Responsive React dashboard

---

## 🏗️ Tech Stack

**Frontend**: React, Auth0 React SDK, CSS

**Backend**: Node.js, Express, Axios, node-cache, Auth0 JWT validation

---

## ⚙️ Setup Instructions

### Clone the Repository
```bash
git clone https://github.com/Siri200211/fidenz-weather-assignment.git
cd fidenz-weather-app
```

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file:
```env
PORT=5000
OPENWEATHER_API_KEY=your_openweather_key
AUTH0_DOMAIN=your_auth0_domain
AUTH0_AUDIENCE=https://weather-api
```

Run backend:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

App runs at: http://localhost:3000

---

## 📊 Comfort Index Formula Explanation

I designed the Comfort Index using a simple rule-based method so that it is easy to understand and explain. Instead of using complex formulas or machine learning, I start with a perfect comfort score of 100 and reduce it only when conditions go outside normal comfort ranges. Temperature is given the highest importance because it affects comfort the most. Humidity has a smaller effect, and wind speed is reduced only when it becomes too high. The final score is rounded and kept above 0, giving an easy and clear comfort value.

---

## ⚖️ Reasoning Behind Variable Weights

- **Temperature**: Has the highest impact because it affects human comfort the most.
- **Humidity**: Has a moderate impact, as very dry or very humid air can cause discomfort.
- **Wind Speed**: Affects comfort only when it becomes too strong, so it is penalized only above a set limit of 5.

The weights reflect the relative importance of each factor on perceived comfort.

---

## 🔁 Trade-offs Considered

- A rule-based method was chosen to keep the logic simple and explainable.
- Real-time performance was prioritized over complex calculations.

---

## 🗄️ Cache Design Explanation

The backend uses `node-cache` to store recent weather API responses in memory for 1 minute. This reduces repeated calls to the OpenWeather API, improves response time, and helps avoid exceeding API rate limits. After 1 minute, the cached data expires and fresh data is fetched from the API.

---

## ⚠️ Known Limitations

- Comfort ranges are based on general assumptions and may not suit all users.
- The Comfort Index does not consider factors such as air quality or precipitation.
- In-memory caching resets when the server restarts.
- The system depends on the availability of the OpenWeather API.

---

## 📂 Project Structure

```
frontend/
  src/
    components/
    pages/
    assets/
    App.js
    App.css

backend/
  src/
    routes/
    services/
    middleware/
    cache/
    utils/
    server.js
```

---

## 👤 Author

**Venuka Sirimanne**

Internship Assignment – Fidenz Technologies