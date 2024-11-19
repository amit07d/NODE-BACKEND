const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = require("./db");

// Middleware
app.use(express.json()); // Parse JSON bodies

// Root Route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});


const menuRoutes = require('./routes/menuRoutes');
app.use('/menu',menuRoutes)

const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes)

// Default 404 Route
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
