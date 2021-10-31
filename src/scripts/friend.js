import axios from "axios";
import { DOMAIN } from "../settings";
import JWT from "./jwt";

class Friend {
  static async invite(id) {
    return await axios.post(
      `${DOMAIN}user/${id}/invite/`,
      {},
      {
        headers: { authorization: `Bearer ${await JWT.getToken()}` },
      }
    );
  }

  static async cancel(id) {
    return await axios.delete(
      `${DOMAIN}user/${id}/cancel/`,
      {
        headers: { authorization: `Bearer ${await JWT.getToken()}` },
      },
      {}
    );
  }

  static async remove(id) {
    return await axios.delete(
      `${DOMAIN}user/${id}/remove/`,
      {
        headers: { authorization: `Bearer ${await JWT.getToken()}` },
      },
      {}
    );
  }

  static async accept(id) {
    return await axios.post(
      `${DOMAIN}user/${id}/accept/`,
      {},
      {
        headers: { authorization: `Bearer ${await JWT.getToken()}` },
      }
    );
  }

  static async reject(id) {
    return await axios.delete(
      `${DOMAIN}user/${id}/reject/`,
      {
        headers: { authorization: `Bearer ${await JWT.getToken()}` },
      },
      {}
    );
  }
}

export default Friend;
