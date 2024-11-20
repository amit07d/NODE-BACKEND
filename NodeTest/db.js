const mongoose = require("mongoose");
require("dotenv").config(); // Ensure that the .env file is loaded

// MongoDB URL from environment variable
const mongoURL = process.env.MONGODB_URL_LOCAL; // Local connection string

//MongoDB URL from online variable
//const mongoURL = process.env.MONGODB_URL

if (!mongoURL) {
  console.error("MongoDB URL is undefined. Please check your .env file.");
  process.exit(1); // Exit if the MongoDB URL is missing
}

mongoose
  .connect(mongoURL)
  .catch((err) => console.error("MongoDB connection error:", err));

const db = mongoose.connection;

// Event listeners for MongoDB connection
db.on("connected", () => {
  console.log("Connected to MongoDB server");
});

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB server");
});

module.exports = db;
