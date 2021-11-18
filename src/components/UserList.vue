<template>
  <div id="user-list">
    <AdminSection v-if="chat.is_admin" :chat="chat"></AdminSection>
    <h4>Users:</h4>
    <div class="user" v-for="(user, index) in chat.users" :key="index">
      <router-link :to="`/user/${user.id}`">
        <p>{{ user.full_name }}</p>
      </router-link>
      <p v-if="user.is_admin">admin</p>
      <span v-if="chat.is_admin && user.id !== getUserID()">
        <button
          class="linkBlack"
          v-if="!user.is_admin"
          @click="makeAdmin(user.id)"
        >
          Make him/her admin
        </button>
        <button
          class="linkBlack"
          v-if="user.is_admin"
          @click="removeAdmin(user.id)"
        >
          Make him/her non-admin
        </button>
        <button
          class="linkBlack"
          @click="removeUser(user.id)"
          v-if="getUserID() !== user.id"
        >
          Kick out
        </button>
      </span>
    </div>
  </div>
</template>

<script>
import AdminSection from "@/components/AdminSection";
import Chat from "@/scripts/chat";
import JWT from "@/scripts/jwt";
import jwt_decode from "jwt-decode";

export default {
  name: "UserList",
  props: {
    chat: {},
  },
  components: {
    AdminSection,
  },
  methods: {
    makeAdmin(userId) {
      Chat.makeAdmin(this.chat.id, userId);
      this.$emit("addAdmin", userId);
    },
    removeAdmin(userId) {
      Chat.removeAdmin(this.chat.id, userId);
      this.$emit("removeAdmin", userId);
    },
    removeUser(userId) {
      Chat.kickOut(this.chat.id, userId);
      this.$emit("removeUser", userId);
    },
    getUserID() {
      return jwt_decode(JWT.getRawToken()).user_id;
    },
  },
};
</script>

<style scoped>
</style>
