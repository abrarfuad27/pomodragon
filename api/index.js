const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const cors = require('cors');

app.use(cors()); //allowing cross-origin
app.use(express.json())

const URI =
  "mongodb+srv://abrarfuad51:aelapin@cluster0.logpdqz.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(`Error -> ${err}`);
  }
}
connect();

app.post('/register',async (req,res)=>{
  // Extract user data from the request body
  const { username, email, password } = req.body;

  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // Hash the password using bcrypt before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user using the User model
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Save the hashed password in the database
    });

    // Save the new user to the database
    await newUser.save();

    // Return a success response to the frontend
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    // Handle errors if any
    console.error("Error registering user:", error);
    res.status(500).json({ message: "An error occurred while registering user." });
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
