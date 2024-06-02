// contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();

  const checkAuth = async () => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      const response = await fetch('https://animila.ru/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${savedToken}`
        }
      });
      const data = await response.json();
      return !!data.email;


    }
  };

  const login = async (email) => {
    try {
      const response = await fetch('https://animila.ru/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    return false;
  };

  const confirm = async (email, code) => {
    try {
      const response = await fetch('https://animila.ru/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, token: code }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.access_token);
        localStorage.setItem('token', data.access_token);
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      console.error('Confirmation error:', error);
    }
    return false;
  };

  const logout = async () => {
    try {
      await fetch('https://animila.ru/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, confirm, logout, checkAuth, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
