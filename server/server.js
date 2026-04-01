import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ CONNECT DB
mongoose.connect("mongodb://127.0.0.1:27017/auth")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ USER MODEL
const User = mongoose.model("User", {
  name: String,
  email: { type: String, unique: true },
  password: String
});

// ✅ TEMP STORES
const otpStore = {};       // store OTP
const tempUsers = {};      // store user before verification

// ✅ EMAIL CONFIG
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD
  }
});

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ❗ check user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ msg: "User already exists" });
    }

    // 🔢 generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    otpStore[email] = otp;
    tempUsers[email] = { name, email, password };
    // 📧 send email
    await transporter.sendMail({
    from: `"SkillifyX" <${process.env.EMAIL}>`,
    to: email,
    subject: "Verify Your Email",
    html: `
        <div style="font-family: Arial; padding: 20px;">
        <h2 style="color:#7c3aed;">SkillifyX Verification</h2>
        <p>Your verification code is:</p>
        <h1 style="letter-spacing:5px;">${otp}</h1>
        <p>This code will expire in 5 minutes.</p>
        </div>
    `
    });

    res.json({ msg: "OTP sent" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

app.post("/api/auth/verify", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (otpStore[email] != otp) {
      return res.json({ msg: "Invalid OTP" });
    }

    const userData = tempUsers[email];

    const user = new User(userData);
    await user.save();

    delete otpStore[email];
    delete tempUsers[email];

    res.json({ msg: "Verified" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.json({ msg: "Invalid credentials" });
    }

    res.json({ msg: "Login success", token: "dummy-token" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});