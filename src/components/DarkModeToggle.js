import React from "react";

export default function DarkModeToggle({ isDarkMode, onToggle }) {
  return (
    <button className="dark-mode-toggle" onClick={onToggle}>
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
