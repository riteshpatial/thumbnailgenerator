import React from "react";

export default function DarkModeToggle({ isDarkMode, onToggle }) {
  return (
    <button className="tally-switch" onClick={onToggle} type="button">
      <span className="tally-switch__lamp" aria-hidden="true" />
      {isDarkMode ? "Editing Bay" : "Light Table"}
    </button>
  );
}
