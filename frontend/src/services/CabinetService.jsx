import api from "@/http/api";

export class CabinetService {
  static async getAll(token) {
    return api.get('/cabinet', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  static async getRoles() {
    return api.get('/roles')
  }

  static async getId(token, id) {
    return api.get(`/cabinet/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  static async create(title, user_id, token) {
    return api.post('/cabinet', {
      title,
      user_id
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  static async update(title, project_id, token) {
    return api.put(`/cabinet/${project_id}`, {
      title
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  static async delete(project_id, token) {
    return api.delete(`/cabinet/${project_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}