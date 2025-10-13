import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Proxy route for weather
app.get("/api/weather", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) return res.status(400).json({ error: "Missing lat/lon parameters" });

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_KEY}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.listen(PORT, () => {
  console.log(`Weather proxy server running on port ${PORT}`);
});
