import { SRE_TOKEN } from "@/helpers/constants";
import http from "@/services/api";

export class TokenServiceOld {
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

  getLocalAccessToken() {
    return localStorage.getItem(SRE_TOKEN);
  }
}

class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem(SRE_TOKEN));
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem(SRE_TOKEN));
    return user?.accessToken;
  }

  updateLocalAccessToken(token) {
    let user = JSON.parse(localStorage.getItem(SRE_TOKEN));
    user.accessToken = token;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem(SRE_TOKEN));
  }

  setUser(user) {
    console.log(JSON.stringify(user));
    localStorage.setItem(SRE_TOKEN, JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem(SRE_TOKEN);
  }
}

export default new TokenService();
