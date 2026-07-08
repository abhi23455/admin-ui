import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  // Theme warna
  const [colorTheme, setColorTheme] = useState(() => {
    const saved = localStorage.getItem("colorTheme");
    return saved ? JSON.parse(saved) : { name: "theme-green", color: "#299D91" };
  });
  
  // Dark/Light mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("isDarkMode");
    return saved ? JSON.parse(saved) : false;
  });

  // Simpan ke localStorage ketika berubah
  useEffect(() => {
    localStorage.setItem("colorTheme", JSON.stringify(colorTheme));
  }, [colorTheme]);

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Gabungkan semua state ke satu object
  const themeContextValue = {
    colorTheme,
    setColorTheme,
    isDarkMode,
    setIsDarkMode,
    // Untuk backward compatibility dengan kode yang masih pakai theme/setTheme
    theme: colorTheme,
    setTheme: setColorTheme,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};