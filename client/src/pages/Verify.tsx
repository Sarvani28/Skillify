import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const verifyOtp = async () => {
    const res = await fetch("http://localhost:5000/api/auth/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, otp })
    });

    const data = await res.json();

    if (data.msg === "Verified") {
      navigate("/dashboard");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* 🌆 Background */}
      <motion.img
        src="https://images.unsplash.com/photo-1557683316-973673baf926"
        className="absolute w-full h-full object-cover brightness-50 scale-110"
        animate={{ scale: [1.1, 1.15, 1.1] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      {/* 🎨 Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a0025]/80 to-black"></div>

      {/* 🌫 Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-gray-300/10 to-white/5 backdrop-blur-sm"></div>

      {/* ✨ Glow */}
      <div className="absolute w-[400px] h-[400px] bg-purple-600/20 blur-[120px] top-[-100px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-[350px] h-[350px] bg-pink-500/20 blur-[120px] bottom-[-100px] right-[-100px] animate-pulse"></div>

      {/* 💎 Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-[380px] p-8 rounded-2xl 
        bg-gray-200/10 backdrop-blur-2xl 
        border border-gray-300/30 
        shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
      >

        {/* 🔐 Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-full bg-purple-600/30 flex items-center justify-center text-white text-xl border border-purple-400/30">
            🔐
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-xl font-semibold mb-2 text-white">
          Verify Your Email
        </h2>

        {/* Subtitle */}
        <p className="text-center text-gray-400 text-sm mb-6">
          Enter the 6-digit code sent to your email
        </p>

        {/* OTP INPUT */}
        <motion.input
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          maxLength={6}
          placeholder="------"
          className="w-full mb-6 bg-transparent border-b border-purple-400/40 py-3 text-white text-center text-2xl tracking-[0.6em] placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
          onChange={(e) => setOtp(e.target.value)}
        />

        {/* VERIFY BUTTON */}
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 25px rgba(168,85,247,0.6)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={verifyOtp}
          className="w-full py-2 rounded-lg 
          bg-gradient-to-r from-purple-600 to-pink-500 
          text-white font-medium 
          border border-purple-400/40 transition"
        >
          Verify & Continue
        </motion.button>

        {/* RESEND */}
        <p className="text-center text-sm text-gray-400 mt-5">
          Didn't receive code?{" "}
          <span className="text-purple-400 cursor-pointer hover:underline">
            Resend
          </span>
        </p>

      </motion.div>
    </div>
  );
};

export default Verify;