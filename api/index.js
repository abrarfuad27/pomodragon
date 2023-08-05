const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const jwtSecret = "13adahf2832igfjka1h2iqivvbak";
const cookieParser = require("cookie-parser");

// Define the update operation with $set to add the new fields with default values

app.use(cors({ credentials: true, origin: "http://localhost:3000" })); //allowing cross-origin
app.use(express.json());
app.use(cookieParser());

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

app.post("/register", async (req, res) => {
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
    res
      .status(500)
      .json({ message: "An error occurred while registering user." });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "3h",
    });
    res
      .cookie("token", token, { httpOnly: true, maxAge: 10800000 })
      .status(200)
      .json({
        message: "Login successful!",
        user: { username: user.username, email: user.email, token: token },
      });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login." });
  }
});

app.post("/signout", (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Signout successful!" });
});

app.get("/records/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }
    res.status(200).json({
      user: {
        username: user.username,
        cycle: user.cycle,
        duration: user.duration,
      },
    });
  } catch (err) {
    console.error("Error while finding user:", err);
    res.status(500).json({ message: "Error while finding user." });
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
