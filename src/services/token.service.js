import { http } from "@/utils/http-common";
import { SRE_TOKEN } from "@/utils/constants";

export class TokenService {
  token = null;

  setToken(token) {
    this.token = token;
    http.defaults.headers["Authorization"] = `Bearer ${token}`;

    localStorage.setItem(SRE_TOKEN, token);
  }

  logout() {
    this.token = null;
    delete http.defaults.headers["Authorization"];
    localStorage.removeItem(SRE_TOKEN);
  }

  renew() {
    const token = localStorage.getItem(SRE_TOKEN);
    if (token) {
      this.setToken(token);
    }
  }

  getPayload() {
    if (this.token) {
      const parts = this.token.split(".");
      const rawToken = atob(parts[1]);
      return JSON.parse(rawToken);
    }
    return null;
  }

  isUserLogged() {
    return this.token != null;
  }
}
