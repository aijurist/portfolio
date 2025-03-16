import React from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

interface ThemeToggleProps {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  toggleTheme,
}) => {
  const isDark = theme === 'dark'; // Derive boolean from string

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`fixed top-4 right-4 z-50 ${
        isDark ? 'bg-white text-black' : 'bg-black text-white'
      } p-2 rounded-full hover:bg-opacity-90 transition-colors shadow-md`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  );
};