import React, { useState, useEffect } from "react";
import { Cloud, MapPin, Thermometer, Droplet, Wind } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Default marker fix for Leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function WeatherForecast() {
  const API_KEY = process.env.REACT_APP_WEATHER_API;
  const [location, setLocation] = useState("Nairobi");
  const [weather, setWeather] = useState(null);
  const [coords, setCoords] = useState({ lat: -1.286389, lon: 36.817223 });
  const [error, setError] = useState("");

  // Fetch weather data
  useEffect(() => {
    if (!API_KEY) {
      setError("⚠️ Missing API key. Please set REACT_APP_WEATHER_API in environment variables.");
      return;
    }

    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();
        if (data.cod !== 200) throw new Error(data.message);
        setWeather(data);
        setCoords({ lat: data.coord.lat, lon: data.coord.lon });
        setError("");
      } catch (err) {
        setError(err.message);
        setWeather(null);
      }
    };

    fetchWeather();
  }, [location, API_KEY]);

  // Handle map click
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setCoords({ lat, lon: lng });
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.cod === 200) {
              setWeather(data);
              setLocation(data.name || `Lat: ${lat.toFixed(2)}, Lon: ${lng.toFixed(2)}`);
            }
          });
      },
    });
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center p-6 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Weather Forecast</h2>
        <p>Check real-time weather updates anywhere in the world.</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white/80 p-4 rounded-2xl shadow-lg flex items-center gap-3">
        <MapPin className="text-sky-500" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city name..."
          className="flex-grow p-2 rounded-lg border border-gray-200 focus:border-sky-400 outline-none"
        />
        <button
          onClick={() => setLocation(location)}
          className="bg-sky-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-sky-600"
        >
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center">
          {error}
        </div>
      )}

      {/* Weather Info */}
      {weather && (
        <div className="bg-white/80 p-6 rounded-3xl shadow-lg grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Cloud className="text-sky-500" />
              {weather.name}, {weather.sys.country}
            </h3>
            <div className="text-5xl font-bold text-sky-600 mb-3">
              {weather.main.temp}°C
            </div>
            <p className="text-gray-700 capitalize">
              {weather.weather[0].description}
            </p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="flex flex-col items-center">
                <Thermometer className="text-orange-500" />
                <span className="text-sm">Feels {weather.main.feels_like}°C</span>
              </div>
              <div className="flex flex-col items-center">
                <Droplet className="text-blue-500" />
                <span className="text-sm">Humidity {weather.main.humidity}%</span>
              </div>
              <div className="flex flex-col items-center">
                <Wind className="text-green-500" />
                <span className="text-sm">Wind {weather.wind.speed} m/s</span>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-72 rounded-2xl overflow-hidden shadow-lg">
            <MapContainer
              center={[coords.lat, coords.lon]}
              zoom={8}
              scrollWheelZoom={true}
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
              <Marker position={[coords.lat, coords.lon]}>
                <Popup>
                  <strong>{weather.name}</strong>
                  <br />
                  {weather.main.temp}°C
                </Popup>
              </Marker>
              <MapClickHandler />
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
}
