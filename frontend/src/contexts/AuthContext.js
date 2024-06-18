// contexts/AuthContext.js
import React, { createContext, useState } from "react";
import { useRouter } from "next/router";
import { AuthService } from "@/services/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null)

  const login = async (email) => {
    return await AuthService.login(email).then(data => {
      console.log('9383838 ', data)
      return data.status
    }).catch(err => {
      console.error('555333 ', err.response.status)
      return err.response.status
    })
  };

  const register = async (first_name, last_name, email, phone) => {
    return await AuthService.register(first_name, last_name, email, phone)
      .then(res => {
        console.log(`3456 ${res}`)
        return {success: true}
      })
      .catch(error => {
        if(error.response.status === 400) {
          const data = error.response.data.message
          const errors = data.split(':')[1].trim().split(', ')
          console.error('Ошибка регистрации:', errors);
          return {success: false, errors: errors, status: 400}
        }

        if(error.response.status === 409) {
          return {success: false, errors: ['email'], status: 409}
        }
      });
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
