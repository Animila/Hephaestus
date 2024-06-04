// contexts/AuthContext.js
import React, { createContext, useState } from "react";
import { useRouter } from "next/router";
import { AuthService } from "@/services/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null)

  const login = async (email) => {
    const data = await AuthService.login(email)
    return data.status === 201
  };

  const register = async (first_name, last_name, email, phone) => {
    try {
      const data = await AuthService.register(first_name, last_name, email, phone);
      console.log(`3456 ${data}`)
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      return false
    }
  };

  const checkAuth = async () => {
    const savedToken = localStorage.getItem('token');
    if (!savedToken) return false

    return await AuthService.getMe(savedToken).then(data => {
      console.log(`23456789`, data)
      if (data.status === 200) {
        setUser(data.data)
        return true
      } else {
        localStorage.removeItem('token')
        return false
      }
    }).catch(() => {
      return false
    })

  };



  const confirm = async (email, code) => {
    const data = await AuthService.confirm(email, code)
    console.log(`3456 `, data)
    if(data.status === 201) {
      localStorage.setItem('token', data.data.access_token)
      return true
    } else {
      return false
    }
  };

  return (
    <AuthContext.Provider value={{ login, register, confirm, checkAuth, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
