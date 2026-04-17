import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { ThemeType } from "./theme";

interface ThemeContextType {
  themeType: ThemeType;
  setThemeType: (type: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeType, setThemeType] = useState<ThemeType>("light");

  return (
    <ThemeContext.Provider value={{ themeType, setThemeType }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
