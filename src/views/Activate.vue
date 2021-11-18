<template>
  <div class="backgroundLogin">
  <h1 class="logo">CARRIER</h1>
  <div class="shape1"></div>
    <div id="activate">
    <h3 id="activateText">Enter Code</h3>
      <input type="text" v-model="code" /><br/>
      <button @click="activate" class="btnLogin">Submit</button>
    </div>
    <p id="error" v-if="message">{{ message }}</p>
  <div class="shape2"></div>
  </div>
</template>

<script>
import User from "@/scripts/user";

export default {
  name: "Activate",
  data() {
    return {
      code: "",
      message: "",
    };
  },
  methods: {
    async activate() {
      const res = await User.activateAccount(this.code);

      if (res.status === 404) {
        this.message = "This is invalid code";
        return;
      }

      this.$router.push({ name: "Self" });
    },
  },
};
</script>

<style scoped>
#activate {
  text-align: center;
}

p#error {
  color: rgb(255, 0, 0);
}
</style>
