// src/context/AuthContext.js
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("employee-user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    // Add role verification if not provided
    if (!userData.role) {
      userData.role = userData.email.includes("@hr.") ? "hr" : "employee";
    }

    localStorage.setItem("employee-user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("employee-user");
    setUser(null);
  };

  const isHR = () => user?.role === "hr";

  // Properly defined HR login function that can be called with credentials
  const handleHRLogin = (hrCredentials) => {
    // In a real app, you would verify these credentials with your backend
    if (hrCredentials.email && hrCredentials.password === "hrpassword") {
      login({
        email: hrCredentials.email,
        name: "HR Manager",
        role: "hr",
        id: "hr-001",
      });
      return true; // Login successful
    }
    return false; // Login failed
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isHR,
        handleHRLogin, // Only expose if needed by components
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
