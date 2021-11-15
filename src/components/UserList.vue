<template>
  <div id="user-list">
    <AdminSection v-if="chat.is_admin" :chat="chat"></AdminSection>
    <h4>Admins:</h4>
    <div class="user" v-for="(user, index) in chat.creators" :key="index">
      <router-link :to="`/user/${user.id}`"
        ><p>{{ user.full_name }}</p></router-link
      >
    </div>
    <h4>Users:</h4>
    <div class="user" v-for="(user, index) in chat.users" :key="index">
      <router-link :to="`/user/${user.id}`">
        <p>{{ user.full_name }}</p>
      </router-link>
      <button
        v-if="chat.is_admin && !user.is_admin"
        @click="makeAdmin(user.id)"
      >
        Make him/her admin
      </button>
      <button
        v-if="chat.is_admin && user.is_admin"
        @click="removeAdmin(user.id)"
      >
        Make him/her non-admin
      </button>
    </div>
  </div>
</template>

<script>
import AdminSection from "@/components/AdminSection";
import Chat from "@/scripts/chat";

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
  },
};
</script>

<style scoped>
.user {
  display: flex;
}
</style>
