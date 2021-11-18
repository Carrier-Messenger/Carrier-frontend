<template>
  <div class="backgroundLogin">
  <h1 class="logo">CARRIER</h1>
    <div class="shape1"></div>
    <div id="inLogin">
      <h1 id="loginTitle">Login</h1>
      <form @submit.prevent="login">
        <label for="email">E-mail:</label><br />
        <input
          required
          type="text"
          id="email"
          v-model="email"
          @keyup="clearError"
        /><br />
        <label for="password">Password:</label><br />
        <input
          required
          type="password"
          id="password"
          v-model="password"
          @keyup="clearError"
        /><br />
        <button class="btnLogin">Submit</button>
      </form>
      <p id="error" v-if="message">{{ message }}</p>
      <router-link to="/register" class="link">I want to register</router-link> <br/>
      <router-link to="/activate" class="link">I want to activate my account</router-link>
    </div>
    <div class="shape2"></div>
  </div>
</template>

<script>
import User from "@/scripts/user";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",

      message: "",
    };
  },
  methods: {
    clearError() {
      this.message = "";
    },
    async login() {
      const logged = await User.login(this.email, this.password);

      if (!logged) {
        this.message = "E-mail or passowrd are wrong";
        return;
      }

      const redirectUrl = this.$route.query.redirect;

      if (redirectUrl) {
        this.$router.push(redirectUrl);
        return;
      }

      this.$router.push({ name: "Self" });
    },
  },
};
</script>

<style scoped>
  @import '../Main.css';
</style>