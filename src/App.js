import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "9334f65eac03523d11970a00b1a5db7c";

  const fetchWeather = async () => {
    const trimmedCity = city.trim();
    if (!trimmedCity) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&units=metric&appid=${API_KEY}`
      );
      setWeather(res.data);
    } catch (error) {
      if (error.response) {
        setError("City not found! Please enter a valid city.");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>⛅ Weather Finder</h1>
      <input
        type="text"
        placeholder="Enter city name"
        className="city-input"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather} disabled={!city.trim() || loading}>
        {loading ? "Loading..." : "Get Weather"}
      </button>

      {error && <p className="error">{error}</p>}

      {weather && !loading && (
        <div className="detail">
          <h2 className="city-name">{weather.name}</h2>
          <h2 className="info">🌡️ Temperature: {weather.main.temp}°C</h2>
          <h2 className="info">
            ☁️ Condition: {weather.weather[0].description.replace(/\b\w/g, (c) => c.toUpperCase())}
          </h2>
          <h2 className="info">💨 Wind Speed: {weather.wind.speed.toFixed(1)} m/s</h2>
        </div>
      )}
    </div>
  );
}

export default App;
