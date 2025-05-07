"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  showLabel?: boolean;
}

const ThemeToggle = ({ showLabel = false }: ThemeToggleProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);

    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  if (!isMounted) return null; // SSR-safe: avoid mismatch

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      className="w-full justify-start gap-2 cursor-pointer"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <>
          <Sun className="h-4 w-4 text-yellow-500 transition-all" />
          {showLabel && <span>Light mode</span>}
        </>
      ) : (
        <>
          <Moon className="h-4 w-4 text-gray-700 dark:text-gray-300 transition-all" />
          {showLabel && <span>Dark mode</span>}
        </>
      )}
    </Button>
  );
};

export default ThemeToggle;
