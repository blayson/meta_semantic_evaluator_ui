import { tokenManager } from "@/main";
import { SRE_TOKEN } from "@/helpers/constants";
// import { http } from "@/helpers/http-common";
import http from "@/services/api";

class AuthService {
  async login(formData) {
    try {
      const response = await http.post("/auth/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const { token } = response.data;
      tokenManager.setToken(token);
      return tokenManager.getPayload();
    } catch (e) {
      localStorage.removeItem(SRE_TOKEN);
      throw e;
    }
  }

  async register(payload) {
    return await http.post("/auth/register", payload);
  }

  logout() {
    tokenManager.logout();
  }
}

export default new AuthService();
