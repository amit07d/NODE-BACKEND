const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  taste: {
    type: String,
    enum: ["sweet", "spicy", "sour"], // Ensures the taste is one of these values
    required: true,
  },
  is_drink: {
    type: Boolean,
    default: false, // Defaults to false if not provided
  },
  ingredients: {
    type: [String], 
    default: [],    // Default to an empty array if not provided
  },
  num_sales: {
    type: Number,
    default: 0, // Default to 0 if not provided
  },
});

// Create and export the model
const MenuItem = mongoose.model("MenuItem", menuItemSchema);
module.exports = MenuItem;
