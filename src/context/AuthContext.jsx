import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Borra el login al cargar la app
  useEffect(() => {
    localStorage.removeItem("user");
    setUser(null);
    setLoading(false);
  }, []);

  const login = (userData) => {
    // ❌ No guardamos en localStorage
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
