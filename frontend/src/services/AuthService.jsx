import api from "@/http/api";
import { Cookie } from "next/dist/compiled/@next/font/dist/google";

export class AuthService {
  static async login(email) {
    return api.post('/auth/login', { email })
  }

  static async confirm(email, token) {
    return api.post('/auth/verify', { email, token })
  }

  static async register(first_name, last_name, email, phone) {
      return api.post('/user/register', { first_name, last_name, email, phone, role_id: 2 })
  }

  static async getId(id) {
    return api.get(`/user/${id}`)
  }



  static async updateUser(id, user, token) {
    return api.put(`/user/${id}`, user, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  static async getMe(token) {
      return api.get('/user/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  static logout() {
    localStorage.removeItem('token')
    return true
  }

}