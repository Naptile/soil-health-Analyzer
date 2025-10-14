import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
ll
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS: allow any Render frontend & localhost
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin.includes(".onrender.com") || origin.includes("localhost")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// --- MongoDB Connection ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// --- Schemas ---
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  city: String,
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
const Contact = mongoose.model("Contact", contactSchema);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
});
const User = mongoose.model("User", userSchema);

// --- Default route ---
app.get("/", (req, res) => {
  res.send("🌍 Soil Health Analyzer API is running...");
});

// --- Contact Routes ---
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message, city } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newMessage = new Contact({ name, email, message, city });
    await newMessage.save();

    console.log("📩 New contact message saved:", newMessage);
    res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("❌ Contact error:", err);
    res.status(500).json({ error: "Failed to send message." });
  }
});

app.get("/api/contact", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages." });
  }
});

app.delete("/api/contact/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.json({ success: true, message: "Message deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete message." });
  }
});

app.patch("/api/contact/:id/read", async (req, res) => {
  try {
    const { id } = req.params;
    const msg = await Contact.findByIdAndUpdate(id, { read: true }, { new: true });
    res.json({ success: true, message: "Message marked as read", data: msg });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update message." });
  }
});

// --- Weather API ---
app.get("/api/weather", async (req, res) => {
  try {
    const { lat, lon, city } = req.query;
    let latitude = lat,
      longitude = lon;

    if (city && !lat && !lon) {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.WEATHER_API_KEY}`;
      const geoRes = await fetch(geoUrl);
      const geoData = await geoRes.json();

      if (!geoData || geoData.length === 0)
        return res.status(404).json({ error: "City not found" });

      latitude = geoData[0].lat;
      longitude = geoData[0].lon;
    }

    if (!latitude || !longitude)
      return res.status(400).json({ error: "Missing lat/lon or city parameter." });

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    res.json({
      success: true,
      city: city || data.timezone,
      coords: { lat: latitude, lon: longitude },
      current: data.current,
      daily: data.daily,
    });
  } catch (err) {
    console.error("❌ Weather error:", err);
    res.status(500).json({ error: "Failed to fetch weather data." });
  }
});

// --- Climate Trends API ---
app.get("/api/climate", async (req, res) => {
  try {
    const { lat, lon, city } = req.query;
    let latitude = lat,
      longitude = lon;

    if (city && !lat && !lon) {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.WEATHER_API_KEY}`;
      const geoRes = await fetch(geoUrl);
      const geoData = await geoRes.json();

      if (!geoData || geoData.length === 0)
        return res.status(404).json({ error: "City not found" });

      latitude = geoData[0].lat;
      longitude = geoData[0].lon;
    }

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    const trends = data.daily.map((day) => ({
      date: new Date(day.dt * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      rainfall: day.rain || 0,
      temp: day.temp.day,
    }));

    res.json({ trends });
  } catch (err) {
    console.error("❌ Climate error:", err);
    res.status(500).json({ error: "Failed to fetch climate trends." });
  }
});

// --- Auth Routes ---
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields are required." });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already registered." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully!" });
  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ error: "Failed to register user." });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password are required." });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials." });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: "Invalid credentials." });

    res.json({ success: true, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Login failed." });
  }
});

// --- Fallback ---
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// --- Start Server ---
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
