// src/context/UserContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Create context for user data
const UserContext = createContext();

// Custom hook to use the context in any component
export const useUser = () => {
  return useContext(UserContext);
};

// Context provider to wrap the entire app and provide the user state
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Store user data (teacherId, role, etc.)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
