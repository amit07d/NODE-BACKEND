const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the student schema
const studentSchema = new Schema({
  name: {
    type: String,
    required: false, // Change to `true` if name should be mandatory
  },
  age: {
    type: Number,
    required: false, // Change to `true` if age should be mandatory
  },
  email: {
    type: String,
    required: false, // Change to `true` for mandatory email
    unique: true, // Ensures emails are unique
  },
  phone: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  photo: {
    type: String, // Path to the uploaded photo
    required: false, // Make `true` if a photo is always expected
  },
});

// Create the Student model
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
