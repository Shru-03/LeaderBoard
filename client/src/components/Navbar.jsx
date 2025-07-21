import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav
      className={`${
        darkMode ? "bg-[#1B1A1D] text-white" : "bg-white text-blue-800"
      } mx-4  sm:mx-10 rounded-full px-4 sm:px-10  py-3 sm:py-5 shadow-lg flex justify-between items-center transition-all duration-300`}
    >
      <div className="text-sm sm:text-xl font-bold tracking-wide">
        LeaderBoard
      </div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="flex border rounded-full px-5 font-semibold py-1 gap-3 items-center text-sm"
      >
        {darkMode ? "Dark" : "Light"}
        <DarkModeSwitch
          className="h-[30px] w-[30px] sm:h-[30px] w-[30px]"
          checked={darkMode}
          sunColor="#facc15"
          size={120}
        />
      </button>
    </nav>
  );
};
