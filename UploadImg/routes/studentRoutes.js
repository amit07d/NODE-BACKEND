const express = require("express");
const router = express.Router();
const Student = require("../models/student"); 
const multer = require("multer");
const path = require("path");
const moment = require("moment"); // Install moment.js for date formatting

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder where files will be saved
  },
  filename: (req, file, cb) => {
    // Format the current date in a human-readable way
    const formattedDate = moment().format("YYYY-MM-DD_HH-mm-ss"); 
    const fileExtension = path.extname(file.originalname); // Get the file extension
    const originalName = path.basename(file.originalname, fileExtension); // Get the original filename without extension
    cb(null, `${formattedDate}-${originalName}${fileExtension}`); // Combine formatted date, original filename, and extension
  },
});

const upload = multer({ storage });

// Create a new student
router.post("/create", upload.single("photo"), async (req, res) => {
  try {
    const { name, age, email, phone, address } = req.body;
    const photoPath = req.file ? req.file.path : null; // Save the file path if it exists

    const newStudent = new Student({
      name,
      age,
      email,
      phone,
      address,
      photo: photoPath, // Save the file path in the database
    });

    await newStudent.save();
    res.status(201).json({ message: "Student created successfully", student: newStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating student record" });
  }
});

module.exports = router;
