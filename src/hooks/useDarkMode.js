import { useState } from "react";

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);
  return { isDarkMode, toggleDarkMode };
}
