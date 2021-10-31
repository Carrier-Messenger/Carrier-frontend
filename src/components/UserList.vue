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
      <router-link :to="`/user/${user.id}`"
        ><p>{{ user.full_name }}</p></router-link
      >
    </div>
  </div>
</template>

<script>
import AdminSection from "@/components/AdminSection";

export default {
  name: "UserList",
  props: {
    chat: {},
  },
  components: {
    AdminSection,
  },
};
</script>

<style scoped>
</style>
