# Weather Comfort Dashboard 🌤️

A full-stack app that analyzes real-time weather data and ranks cities by a custom **comfort score**. It uses **Auth0** for authentication, a **secured Express API**, and a responsive React dashboard.

---

## 📌 Features

- Auth0 login (MFA enabled) and protected routes
- Backend API secured with JWT validation
- Live data from OpenWeather API with in-memory caching
- Comfort score calculation per city and ranking
- Responsive dashboard UI with floating logout button
- Clear separation of frontend and backend

---

## 🏗️ Tech Stack

**Frontend**: React, Auth0 React SDK, CSS

**Backend**: Node.js, Express, Auth0 JWT validation, Axios, node-cache

---

## 🔐 Authentication

- Auth0 handles auth; public sign-up is disabled.
- Frontend obtains an access token and sends it as `Authorization: Bearer <token>`.
- Backend validates tokens with `express-oauth2-jwt-bearer` before serving data.

Auth flow: (1) User logs in via Auth0. (2) Auth0 issues an access token. (3) Frontend calls backend with the token. (4) Backend validates and returns secure data.

---

## 📊 Comfort Score

I designed the Comfort Index using a simple rule-based method so that it is easy to understand and explain. Instead of using complex formulas or machine learning, I start with a perfect comfort score of 100 and reduce it only when conditions go outside normal comfort ranges. Temperature is given the highest importance because it affects comfort the most. Humidity has a smaller effect, and wind speed is reduced only when it becomes too high. This method makes it clear how each factor changes the final score and keeps the system easy to adjust, test, and use in real situations.


## 📂 Project Structure

```
frontend/
	src/
		components/
			Header.js
			WeatherTable.js
		pages/
			Dashboard.js
		assets/
			weather.png.avif
			dashboard.avif
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
	.env (not committed)
```

---

## ⚙️ Setup & Run

1) Clone
```
git clone https://github.com/Siri200211/fidenz-weather-assignment.git
cd fidenz-weather-app
```

2) Backend
```
cd backend
npm install

# .env
PORT=5000
OPENWEATHER_API_KEY=your_openweather_key
AUTH0_DOMAIN=your_auth0_domain
AUTH0_AUDIENCE=https://weather-api

npm run dev
```

3) Frontend
```
cd frontend
npm install
npm start
# App runs at http://localhost:3000
```

---

## 🔧 Notes

- Caching: `node-cache` keeps the latest API payload in memory to reduce calls.
- Assets: main and dashboard backgrounds photos live in `frontend/src/assets/`.
- Auth0: ensure the audience in Auth0 matches `AUTH0_AUDIENCE` and the backend uses the same domain.

---

## 👤 Author

Venuka Sirimanne — Internship Assignment, Fidenz Technologies
