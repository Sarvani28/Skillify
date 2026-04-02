import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";

const NotificationBell = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/notifications")
      .then(res => res.json())
      .then(data => setCount(data.count));
  }, []);

  return (
    <div className="relative cursor-pointer">
      <FaBell className="text-xl text-gray-300 hover:text-white" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-pink-500 text-xs px-1 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;