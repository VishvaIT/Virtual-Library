import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      if (parsedUser && parsedUser.token) {
        try {
          const decoded = jwtDecode(parsedUser.token);
          if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem('user');
            setUser(null);
          } else {
            setUser(parsedUser);
          }
        } catch (error) {
          localStorage.removeItem('user');
          setUser(null);
        }
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('/auth/login', { email, password });
    localStorage.setItem('user', JSON.stringify(res.data));
    setUser(res.data);
    return res.data;
  };

  const register = async (userData) => {
    const res = await axios.post('/auth/register', userData);
    localStorage.setItem('user', JSON.stringify(res.data));
    setUser(res.data);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
