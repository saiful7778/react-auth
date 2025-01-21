import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";

export default function useTheme() {
  const context = useContext(ThemeContext);

  if (!context)
    throw new Error("useTheme must be used within an ThemeContext provider");

  return context;
}
