import { Link, useLocation } from "react-router-dom";
import { FaHome, FaChartBar, FaBrain, FaRoad, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";

const SkillSyncNavbar = () => {
  const location = useLocation();

  const menu = [
    { name: "Home", path: "/skillsync-dashboard", icon: <FaHome /> },
    { name: "Skill Input", path: "/skill-input", icon: <FaBrain /> },
    { name: "Demand", path: "/skill-demand", icon: <FaChartBar /> },
    { name: "Gap", path: "/skill-gap", icon: <FaChartBar /> },
    { name: "Roadmap", path: "/roadmap", icon: <FaRoad /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 
    bg-white/10 backdrop-blur-xl border-r border-white/20 p-5">

      {/* Logo */}
      <h1 className="text-2xl font-bold mb-10 text-purple-400">
        SkillSync
      </h1>

      {/* Menu */}
      <div className="space-y-4">
        {menu.map((item, index) => (
          <Link key={index} to={item.path}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
              ${
                location.pathname === item.path
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              {item.icon}
              {item.name}
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SkillSyncNavbar;