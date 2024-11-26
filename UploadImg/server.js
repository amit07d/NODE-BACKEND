const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

app.use(express.json()); 
const PORT = process.env.PORT || 3000;

const studentRoutes = require("./routes/studentRoutes");
app.use('/student', studentRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  