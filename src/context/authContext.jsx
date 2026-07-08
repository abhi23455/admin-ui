import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

// Fungsi untuk mengecek apakah token sudah expired
const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Waktu saat ini dalam detik
    return decoded.exp < currentTime;
  } catch (err) {
    return true;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");

    if (token && !isTokenExpired(token)) {
      try {
        return jwtDecode(token);
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
        return null;
      }
    } else if (token) {
      // Token expired, hapus dari localStorage
      localStorage.removeItem("token");
    }

    return null;
  });

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);

      setUser(decoded);
      localStorage.setItem("token", token);
    } catch (err) {
      console.error("Invalid token");
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
