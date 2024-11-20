const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("./auth");

// Middleware
app.use(express.json()); // Parse JSON bodies
// Use the PORT from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}]`
  );
  next();
};

app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate("local", { session: false });

// Root Route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Import Routes
const menuRoutes = require("./routes/menuRoutes");
app.use("/menu", menuRoutes);

const personRoutes = require("./routes/personRoutes");
app.use("/person", localAuthMiddleware, personRoutes);

// Default 404 Route
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
