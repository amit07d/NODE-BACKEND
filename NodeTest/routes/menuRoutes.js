const express = require('express')
const router = express.Router()
const MenuItem = require("../models/Menu");

router.post("/", async (req, res) => {
    try {
      const data = req.body;
      const newMenu = new MenuItem(data);
      const response = await newMenu.save();
      console.log("Menu data saved successfully");
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  router.get("/", async (req, res) => {
    try {
      const data = await MenuItem.find();
      console.log("Menu data fetched");
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

router.get('/:tasteType', async (req, res) => {
    try {
      const tasteType = req.params.tasteType
      const validTaste =['sweet', 'spicy', 'sour']
      if (validTaste.includes(tasteType)) {
        const response = await MenuItem.find({ taste: tasteType });
        console.log("Response fetched");
        res.status(200).json(response);
      } else {
        res.status(400).json({ error: "Invalid work type" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  })

  module.exports = router;