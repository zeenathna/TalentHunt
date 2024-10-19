// src/context/UserContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a UserContext
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData); // Set the logged-in user's data
  };

  const logout = () => {
    setUser(null); // Clear user data on logout
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
