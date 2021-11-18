import { DOMAIN } from "../settings";
import axios from "axios";
import JWT from "./jwt";

class User {
  static async searchUser(name) {
    if (JWT.isLogged())
      return await axios.get(`${DOMAIN}user/by-name/?name=${name}&limit=10`, {
        headers: { authorization: `Bearer ${await JWT.getToken()}` },
      });

    return await axios.get(`${DOMAIN}user/by-name/?name=${name}`);
  }

  static async getUserInfo(id) {
    if (JWT.isLogged()) {
      const response = await axios.get(`${DOMAIN}user/${id}/`, {
        headers: { authorization: `Bearer ${await JWT.getToken()}` },
      });

      return response.data;
    }

    const response = await axios.get(`${DOMAIN}user/${id}/`);

    return response.data;
  }

  static async register(email, username, firstName, lastName, password) {
    return await axios
      .post(`${DOMAIN}user/create/`, {
        email,
        username,
        first_name: firstName,
        last_name: lastName,
        password,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  }

  static async login(email, password) {
    return await axios
      .post(`${DOMAIN}auth/`, { username: email, password })
      .then((res) => {
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);

        return true;
      })
      .catch(() => {
        return false;
      });
  }

  static async activateAccount(code) {
    return await axios
      .get(`${DOMAIN}auth/verify/email/?code=${code}`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  }

  static async activateEmailChange(code) {
    return await axios
      .get(`${DOMAIN}auth/verify/email-change/?code=${code}`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  }

  static async getMeInfo() {
    return await axios
      .get(`${DOMAIN}user/current-user/`, {
        headers: { authorization: `Bearer ${await JWT.getToken()}` },
      })
      .then((res) => {
        return res.data;
      });
  }

  static async getFriendInvitations() {
    return await axios
      .get(`${DOMAIN}user/invites-to-me/`, {
        headers: { authorization: `Bearer ${await JWT.getToken()}` },
      })
      .then((res) => {
        return res.data;
      });
  }

  static logOut() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }

  static async editMe(json) {
    return await axios
      .put(`${DOMAIN}user/edit/`, json, {
        headers: { authorization: `Bearer ${await JWT.getToken()}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  }

  static async addPfp(formData) {
    return await axios.post(`${DOMAIN}user/add-pfp/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${await JWT.getToken()}`,
      },
    });
  }
}

export default User;
