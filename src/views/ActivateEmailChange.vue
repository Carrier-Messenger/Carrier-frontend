<template>
  <div id="activate">
    <input type="text" v-model="code" />
    <button @click="activate">Submit</button>

    <p id="error" v-if="message">{{ message }}</p>
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
      const res = await User.activateEmailChange(this.code);

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
