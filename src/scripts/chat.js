import axios from "axios";
import { DOMAIN } from "@/settings.js";
import JWT from "./jwt";

class Chat {
  static async getChats() {
    return await axios
      .get(`${DOMAIN}chat/get-user-groups/`, {
        headers: { authorization: `Bearer ${await JWT.getToken()}` },
      })
      .then((res) => {
        return res.data;
      });
  }

  static async getChatInfo(id) {
    return await axios
      .get(`${DOMAIN}chat/${id}/`, {
        headers: { authorization: `Bearer ${await JWT.getToken()}` },
      })
      .then((res) => {
        return res.data;
      });
  }

  static async getChatMessages(id, offset, limit, messageId) {
    return await axios
      .get(
        `${DOMAIN}chat/${id}/get-messages/?offset=${offset}&limit=${limit}&last_message=${messageId}`,
        {
          headers: { authorization: `Bearer ${await JWT.getToken()}` },
        }
      )
      .then((res) => {
        return res.data;
      });
  }

  static async getChatMessagesFirst(id, offset, limit) {
    return await axios
      .get(
        `${DOMAIN}chat/${id}/get-messages/?offset=${offset}&limit=${limit}`,
        {
          headers: { authorization: `Bearer ${await JWT.getToken()}` },
        }
      )
      .then((res) => {
        return res.data;
      });
  }

  static async getChatUser(id, name) {
    return await axios
      .get(`${DOMAIN}chat/${id}/search-user/?name=${name}`, {
        headers: { authorization: `Bearer ${await JWT.getToken()}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  }

  static async accept(id) {
    return await axios
      .post(
        `${DOMAIN}chat/${id}/accept/`,
        {},
        {
          headers: { authorization: `Bearer ${await JWT.getToken()}` },
        }
      )
      .catch((err) => {
        return err.response;
      });
  }

  static async reject(id) {
    return await axios
      .delete(
        `${DOMAIN}chat/${id}/reject/`,
        {
          headers: { authorization: `Bearer ${await JWT.getToken()}` },
        },
        {}
      )
      .catch((err) => {
        return err.response;
      });
  }

  static async invite(id, userId) {
    return await axios
      .post(
        `${DOMAIN}chat/${id}/invite/`,
        {
          user: userId,
        },
        {
          headers: { authorization: `Bearer ${await JWT.getToken()}` },
        }
      )
      .catch((err) => {
        return err.response;
      });
  }

  static async cancel(id, userId) {
    return await axios
      .delete(`${DOMAIN}chat/${id}/cancel/`, {
        headers: { authorization: `Bearer ${await JWT.getToken()}` },
        data: { user: userId },
      })
      .catch((err) => {
        console.log(err.response);
        return err.response;
      });
  }

  static async makeAdmin(id, userId) {
    return await axios
      .post(
        `${DOMAIN}chat/${id}/add-admin/`,
        { user: userId },
        {
          headers: { authorization: `Bearer ${await JWT.getToken()}` },
        }
      )
      .catch((err) => {
        err.response;
      });
  }

  static async kickOut(id, userId) {
    return await axios
      .delete(`${DOMAIN}chat/${id}/remove/`, {
        headers: { authorization: `Bearer ${await JWT.getToken()}` },
        data: { user: userId },
      })
      .catch((err) => {
        return err.response;
      });
  }

  static async leave(id) {
    return await axios
      .delete(`${DOMAIN}chat/${id}/leave/`, {
        headers: { authorization: `Bearer ${await JWT.getToken()}` },
      })
      .catch((err) => {
        return err.response;
      });
  }

  static async delete(id) {
    return await axios
      .delete(`${DOMAIN}chat/${id}/delete/`, {
        headers: { authorization: `Bearer ${await JWT.getToken()}` },
      })
      .catch((err) => {
        return err.response;
      });
  }

  static async removeAdmin(id, userId) {
    return await axios
      .delete(`${DOMAIN}chat/${id}/remove-admin/`, {
        headers: { authorization: `Bearer ${await JWT.getToken()}` },
        data: { user: userId },
      })
      .catch((err) => {
        err.response;
      });
  }

  static async createChat(name) {
    return await axios
      .post(
        `${DOMAIN}chat/create/`,
        { name },
        { headers: { authorization: `Bearer ${await JWT.getToken()}` } }
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  }
}

export default Chat;
