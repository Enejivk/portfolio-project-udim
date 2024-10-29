import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage, or default values if localStorage is empty
  const [status, setStatus] = useState(() => {
    return localStorage.getItem('status') === 'true' || false;
  });
  
  const [userData, setUserData] = useState(() => {
    const savedUserData = localStorage.getItem('userData');
    return savedUserData ? JSON.parse(savedUserData) : {};
  });

  // Update localStorage when status or userData changes
  useEffect(() => {
    localStorage.setItem('status', status);
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [status, userData]);

  // Login function to update state and localStorage
  const login = (user) => {
    setStatus(true);
    setUserData(user);
  };

  // Logout function to clear state and localStorage
  const logout = () => {
    setStatus(false);
    setUserData({});
    localStorage.removeItem('status');
    localStorage.removeItem('userData');
  };

  return (
    <AuthContext.Provider value={{ status, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}
