const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");
const { generateToken } = require("../jwt");

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    // Create and save the new person
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("Person data saved");

    // Create the payload for the token
    const payload = {
      id: response.id, // MongoDB-generated ID
      username: response.username, // Username from the person
    };
    console.log("Payload for token:", JSON.stringify(payload));

    // Generate JWT with the payload
    const token = generateToken(payload);
    console.log("Generated Token:", token);

    // Respond with the saved person and the token
    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Login route

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Person.findOne({ username: username });
    
    // If user is not found or password doesn't match, return an error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const payload = {
      id: user.id,
      username: user.username
    };
    const token = generateToken(payload);

    res.json({ token });
  } catch(error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Get all persons
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Person data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get persons by work type
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType.trim().toLowerCase();  // Normalize to lowercase
    const validWorkTypes = ["chef", "waiter", "manager"];

    if (validWorkTypes.includes(workType)) {
      const response = await Person.find({ work: workType });
      console.log("Response fetched");
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Update a person by ID
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatePersonData = req.body;
    const response = await Person.findByIdAndUpdate(
      personId,
      updatePersonData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Person data updated");
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a person by ID
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Person data deleted");
    res.status(200).json({ message: "Person deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
