import axios from "axios";
import { DOMAIN } from "../settings";
import jwt_decode from "jwt-decode";

class JWT {
  static async getToken() {
    await this.refreshToken();

    return this.getRawToken();
  }

  static async refreshToken() {
    await axios
      .post(DOMAIN + "auth/refresh/", { refresh: this.getRawRefreshToken() })
      .then((res) => {
        localStorage.setItem("access", res.data.access);
      });
  }

  static isLogged() {
    if (!localStorage.getItem("refresh")) return false;

    const token = jwt_decode(this.getRawRefreshToken());

    return Date.now() < token.exp * 1000;
  }

  static getRawToken() {
    return localStorage.getItem("access");
  }

  static getRawRefreshToken() {
    return localStorage.getItem("refresh");
  }
}

export default JWT;
