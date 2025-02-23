import React from "react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pomodoro Timer</h1>
      </div>
    </nav>
  );
};

export default Navbar;
