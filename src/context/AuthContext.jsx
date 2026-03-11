import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage on init
  useEffect(() => {
    const savedUser = localStorage.getItem('eb_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email, password) => {
    // Simple mock login
    let mockUser = { email, name: email.split('@')[0], role: 'user' };
    
    // Check if it's admin
    if (email.toLowerCase() === 'admin@eventbookings.com') {
      mockUser = { ...mockUser, role: 'admin', name: 'Admin User' };
    }

    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('eb_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const signup = (userData) => {
    // Simple mock signup
    const newUser = { ...userData, role: 'user' };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('eb_user', JSON.stringify(newUser));
  };

  const logout = (navigate) => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('eb_user');
    if (navigate) navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
