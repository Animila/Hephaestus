import modal_api from "@/http/modal_api";

export class ModelsService {
  static async getModels(user_id = null) {
    const url = user_id ? `/get_models_list?user_id=${user_id}` : '/get_models_list';
    return modal_api.get(url);
  }

  static async newModel(user_id, title, description, created_at, file) {
    return modal_api.post(
      `/create_model?user_id=${user_id}&title=${title}&description=${description}&created_at=${created_at}`,
      file
    );
  }


  static async getModel() {
    return {}
  }

  static async updateModel() {
    return {}
  }

  static async deleteModel() {
    return {}
  }
}