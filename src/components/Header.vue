<template>
  <div class="header">
    <header>
      <div id="left">
        <router-link class="logoHeader" to="/">
        <h1>Carrier</h1>
        </router-link>
        <div>
          <form class="searchForm">
            <input class="friendInput" type="text" @keyup="searchUser" v-model="name" required/>
            <label class="friendLabel">Search</label>
            <div class="underline"></div>
          </form>
          <div id="friendResults" ref="results">
            <p v-if="users.length === 0" class="noResult">Nie ma takich użytkowników</p>
            <a :href="`/user/${user.id}`" v-for="user in users" :key="user.id">
              <div class="user">
                <img :src="user.pfp" class="user-pfp" />
                <p class="friendName">{{ user.full_name }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div id="right">
        <router-link to="/chat">
          <p>Chats</p>
        </router-link>
        <router-link to="/">
          <p>My profile</p>
        </router-link>
        <router-link to="/edit">
          <p>Edit profile</p>
        </router-link>
        <router-link @click="logOut" to="/"><p>Log out</p></router-link>
      </div>
    </header>
  </div>
</template>

<script>
import User from "@/scripts/user.js";

export default {
  name: "Header",
  data() {
    return {
      name: "",
      users: [],
    };
  },
  methods: {
    async searchUser() {
      if (!this.name) {
        this.$refs.results.style.display = "none";

        return;
      }

      this.$refs.results.style.display = "block";

      this.users = (await User.searchUser(this.name)).data;
    },
    logOut() {
      User.logOut();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped>
header {
  height: 48px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
#right,
#left > div {
  display: flex;
  align-items: center;
  justify-content: center;
}

#left {
  display: flex;
  flex-direction: row;
}
a > p {
  margin: 10px 10px 10px 10px;
}
@import '../Main.css';
</style>
