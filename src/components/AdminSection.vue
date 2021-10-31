<template>
  <div id="admin-section">
    <input type="text" v-model="userName" @keyup="updateUserSearch" />
    <div id="results" ref="results">
      <div class="user" v-for="(user, index) in results" :key="index">
        <div v-if="user.is_me"></div>
        <div v-else-if="user.is_invited">
          <router-link :to="`/user/${user.id}`">
            <p>{{ user.full_name }}</p>
          </router-link>
          <button @click="cancel(user.id)">Cancel request</button>
        </div>
        <div v-else-if="user.is_admin">
          <router-link :to="`/user/${user.id}`">
            <p>{{ user.full_name }}</p>
          </router-link>
          <button @click="removeAdmin(user.id)">Make him/her non-admin</button>
        </div>
        <div v-else-if="user.is_member">
          <router-link :to="`/user/${user.id}`">
            <p>{{ user.full_name }}</p>
          </router-link>
          <button @click="kickOut(user.id)">Kick out</button>
          <button @click="makeAdmin(user.id)">Make him/her admin</button>
        </div>
        <div v-else>
          <router-link :to="`/user/${user.id}`">
            <p>{{ user.full_name }}</p>
          </router-link>
          <button @click="invite(user.id)">Invite</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chat from "@/scripts/chat";

export default {
  name: "AdminSection",
  props: {
    chat: {},
  },
  data() {
    return {
      userName: "",
      results: [],
    };
  },
  methods: {
    async updateUserSearch() {
      if (!this.userName) {
        this.$refs.results.style.display = "none";
        return;
      }

      this.$refs.results.style.display = "block";
      this.results = await Chat.getChatUser(
        this.$route.params.id,
        this.userName
      );
    },
    async kickOut(id) {
      Chat.kickOut(this.$route.params.id, id);
      this.updateUserSearch();
    },
    async invite(id) {
      Chat.invite(this.$route.params.id, id);
      this.updateUserSearch();
    },
    async cancel(id) {
      Chat.cancel(this.$route.params.id, id);
      this.updateUserSearch();
    },
    async makeAdmin(id) {
      Chat.makeAdmin(this.$route.params.id, id);
      this.updateUserSearch();
    },
    async removeAdmin(id) {
      Chat.removeAdmin(this.$route.params.id, id);
      this.updateUserSearch();
    },
  },
};
</script>

<style scoped>
</style>
