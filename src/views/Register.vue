<template>
  <div id="register">
    <h1>Registration</h1>
    <form @submit.prevent="register">
      <label for="username">Username:</label><br />
      <input
        required
        type="text"
        id="username"
        v-model="username"
        @keyup="clearError"
      /><br />
      <label for="email">E-mail:</label><br />
      <input
        required
        type="text"
        id="email"
        v-model="email"
        @keyup="clearError"
      /><br />
      <label for="first-name">First name:</label><br />
      <input
        required
        type="text"
        id="first-name"
        v-model="firstName"
        @keyup="clearError"
      /><br />
      <label for="last-name">Last name:</label><br />
      <input
        required
        type="text"
        id="last-name"
        v-model="lastName"
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
      <label for="repeat-password">Repeat password:</label><br />
      <input
        required
        type="password"
        id="repeat-password"
        v-model="repeatPassword"
        @keyup="clearError"
      /><br />
      <button>Submit</button>
    </form>
    <p id="error" v-if="message">{{ message }}</p>
    <router-link to="/login">Already a user</router-link>
    <router-link to="/activate">I want to activate my account</router-link>
  </div>
</template>

<script>
import User from "@/scripts/user";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      repeatPassword: "",

      message: "",
    };
  },
  methods: {
    clearError() {
      this.message = "";
    },
    async register() {
      if (this.password !== this.repeatPassword) {
        this.message = "Passwords are not same";
        return;
      }

      const res = await User.register(
        this.email,
        this.username,
        this.firstName,
        this.lastName,
        this.password
      );

      if (res.error_code === "USER-6") {
        this.message = "User with this e-mail already exists";
        return;
      }
      if (res.error_code === "USER-7") {
        this.message = "User with this username already exists";
        return;
      }
      if (res.error_code === "USER-12") {
        this.message = "This password is too commont";
        return;
      }
      if (res.error_code === "USER-13") {
        this.message = "This password is too short";
        return;
      }
      if (res.error_code === "USER-14") {
        this.message = "This password is entirely numeric";
        return;
      }
      if (res.error_code === "USER-18") {
        this.message = "This is not a valid e-mail";
        return;
      }

      this.$router.push({ name: "Activate" });
    },
  },
};
</script>

<style scoped>
#register {
  text-align: center;
}

a {
  display: block;
}
</style>
