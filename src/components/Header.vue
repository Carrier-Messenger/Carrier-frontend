<template>
  <div class="header">
    <header>
      <div id="left">
        <router-link to="/">
          <img src="./../assets/logo.png" alt="Carrier logo" />
        </router-link>
        <div>
          <form>
            <input type="text" @keyup="searchUser" v-model="name" />
          </form>
          <div id="results" ref="results">
            <p v-if="users.length === 0">Nie ma takich użytkowników</p>
            <a :href="`/user/${user.id}`" v-for="user in users" :key="user.id">
              <div class="user">
                <img :src="user.pfp" class="user-pfp" />
                <p>{{ user.full_name }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div id="middle">
        <h1>Carrier</h1>
      </div>
      <div id="right">
        <router-link to="/chat">
          <p>Chats</p>
        </router-link>
        <p>|</p>
        <router-link to="/">
          <p>My profile</p>
        </router-link>
        <p>|</p>
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

header > div {
  background-color: rgb(78, 78, 78);
  flex: 1;
}

#middle,
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

img,
#user-pfp {
  width: 48px;
  height: 48px;
}

#results {
  display: none;
  min-height: 50px;
  width: 200px;
  background-color: rgb(194, 84, 84);
  position: absolute;
  top: 48px;
}

.user {
  display: flex;
}

a > p {
  margin: 10px 10px 10px 10px;
}
</style>
