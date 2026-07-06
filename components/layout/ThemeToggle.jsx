"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme ? savedTheme === "dark" : true;

    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";

    setDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const nextDarkMode = !darkMode;

    document.documentElement.classList.toggle("dark", nextDarkMode);
    document.documentElement.style.colorScheme = nextDarkMode
      ? "dark"
      : "light";

    localStorage.setItem("theme", nextDarkMode ? "dark" : "light");
    setDarkMode(nextDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
    >
      {darkMode ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}