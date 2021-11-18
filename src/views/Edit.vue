<template>
  <div id="edit-user" class="backgroundMain" v-if="user">
  <div  class="edit">
    <ul>
      <label for="email">Change email:</label>
      <br />
      <input id="email" type="email" v-model="email" /><br />

      <label for="username">Change username:</label
      ><br />
      <input id="username" type="text" v-model="username" /><br />

      <label for="first-name">Change first name:</label
      ><br />
      <input id="first-name" type="text" v-model="firstName" /><br />

      <label for="last-name">Change last name:</label
      ><br />
      <input id="last-name" type="text" v-model="lastName" /><br />

      <label for="current-password">Your current password:</label
      ><br />
      <input
        id="current-password"
        type="password"
        v-model="password"
        @keyup="clearErrors"
      /><br />

      <label for="password">Change password:</label
      ><br />
      <input
        id="password"
        type="password"
        v-model="password"
        @keyup="clearErrors"
      /><br />

      <label for="repeat-password">Repeat changed password:</label
      ><br />
      <input
        id="repeat-password"
        type="password"
        v-model="repeatPassword"
        @keyup="clearErrors"
      /><br />
      <label for="editPfp">Change profile picture</label
      ><br />
      <input
        type="file"
        id="editPfp"
        name="avatar"
        accept="image/png, image/jpg, image/jpeg"
        @change="addFile"
      />
    </ul>
    <button @click="submit" class="btnLogin">Submit</button> <br />
    <p id="error" v-if="message">{{ message }}</p>
    <router-link to="/activate/change" class="link">I already have e-mail change code</router-link>
    </div>
  </div>
</template>

<script>
import User from "@/scripts/user";

export default {
  name: "Edit",
  data() {
    return {
      user: null,

      message: "",

      email: "",
      username: "",
      firstName: "",
      lastName: "",
      currentPassword: "",
      password: "",
      repeatPassword: "",

      formData: new FormData(),
    };
  },
  async beforeCreate() {
    this.user = await User.getMeInfo();
  },
  methods: {
    clearErrors() {
      this.message = "";
    },
    addFile(event) {
      this.formData = new FormData();
      this.formData.append("pfp", event.target.files[0]);
    },
    async submit() {
      if (this.password !== this.repeatPassword) {
        this.message = "Passwords are not same";
        return;
      }

      let json = {};

      if (this.email) json.email = this.email;
      if (this.password) json.new_password = this.password;
      if (this.currentPassword) json.password = this.currentPassword;
      if (this.firstName) json.first_name = this.firstName;
      if (this.lastName) json.last_name = this.lastName;
      if (this.username) json.username = this.username;

      const res = await User.editMe(json);

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
      if (res.error_code === "USER-15") {
        this.message = "This is wrong password";
        return;
      }
      if (res.error_code === "USER-18") {
        this.message = "This is invalid e-mail";
        return;
      }
      if (res.error_code === "USER-21") {
        this.message = "This is already your e-mail";
        return;
      }

      if (this.email) {
        this.$router.push({ name: "ActivateEmailChange" });
      }

      if (this.formData.has("pfp")) {
        await User.addPfp(this.formData);
      }

      this.$router.push({ name: "Self" });
    },
  },
};
</script>

<style scoped>
</style>
