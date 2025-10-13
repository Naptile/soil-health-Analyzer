import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icons for Leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function WeatherForecast({ user }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(user?.location || "Nairobi");
  const [coords, setCoords] = useState({
    lat: user?.coords?.lat || -1.2921,
    lon: user?.coords?.lon || 36.8219,
  });

  const API_KEY = "66d694db9127b652fff02964c0afa215";

  const fetchCoords = async (cityName) => {
    try {
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoRes.json();
      if (geoData.length > 0) {
        return { lat: geoData[0].lat, lon: geoData[0].lon };
      } else {
        alert("City not found!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

  const fetchWeather = async (latitude, longitude) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      setWeatherData({
        temp: data.main.temp,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        description: data.weather[0].description,
        city: data.name,
      });
      setCoords({ lat: latitude, lon: longitude });
    } catch (error) {
      console.error("Error fetching weather:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch based on user's location
  useEffect(() => {
    if (user?.location) {
      fetchCoords(user.location).then((newCoords) => {
        if (newCoords) fetchWeather(newCoords.lat, newCoords.lon);
      });
    } else {
      fetchWeather(coords.lat, coords.lon);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const newCoords = await fetchCoords(city);
    if (newCoords) {
      fetchWeather(newCoords.lat, newCoords.lon);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Weather Forecast</h2>

      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="flex gap-2 items-center w-full max-w-md"
      >
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter your city"
          className="flex-1 p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-400"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:shadow-lg transition-all"
        >
          Search
        </button>
      </form>

      {loading ? (
        <p>Loading weather data...</p>
      ) : weatherData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weather Info */}
          <div className="bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-xl">
            <h3 className="text-xl font-bold mb-4">{weatherData.city}</h3>
            <p className="text-lg">
              <span className="font-semibold">Temperature:</span> {weatherData.temp}°C
            </p>
            <p className="text-lg">
              <span className="font-semibold">Humidity:</span> {weatherData.humidity}%
            </p>
            <p className="text-lg">
              <span className="font-semibold">Wind Speed:</span> {weatherData.wind_speed} m/s
            </p>
            <p className="text-lg capitalize">
              <span className="font-semibold">Condition:</span> {weatherData.description}
            </p>
          </div>

          {/* Map */}
          <div className="h-96 w-full rounded-3xl overflow-hidden shadow-xl">
            <MapContainer
              center={[coords.lat, coords.lon]}
              zoom={10}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <Marker position={[coords.lat, coords.lon]}>
                <Popup>{weatherData.city}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      ) : (
        <p className="text-red-600">Failed to load weather data.</p>
      )}
    </div>
  );
}
