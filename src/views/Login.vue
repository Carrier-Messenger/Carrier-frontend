<template>
  <div id="login">
    <div id="inlogin">
      <h1>Login</h1>
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
        <button>Submit</button>
      </form>
      <p id="error" v-if="message">{{ message }}</p>
      <router-link to="/register">I want to register</router-link>
      <router-link to="/activate">I want to activate my account</router-link>
    </div>
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
#login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#inlogin {
  text-align: center;
  border-radius: 30%;
  border: black 1px solid;
  padding: 50px;
}

a {
  display: block;
}

button {
  margin: 10px 0px 10px 0px;
}

form {
  text-align: center;
}
</style>