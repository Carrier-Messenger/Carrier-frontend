<template>
  <div id="create">
    <label for="name"></label><br />
    <input id="name" type="text" v-model="name" @keyup="clearError" /><br />
    <button @click="create()">Create</button>
    <p ref="error" id="error" v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import Chat from "@/scripts/chat";

export default {
  name: "CreateChat",
  data() {
    return {
      name: "",
      message: "",
    };
  },
  methods: {
    clearError() {
      this.message = "";
    },
    async create() {
      if (!this.name) {
        this.message = "You haven't filled chat name";
        return;
      }

      const res = await Chat.createChat(this.name);

      if (res.error_code === "CHAT-3") {
        this.message = "Chat with this name already exists";
        return;
      }

      this.$emit("addchat", res);

      this.$router.push({
        name: "ChatID",
        params: { id: res.id },
      });
    },
  },
};
</script>

<style scoped>
#error {
  color: red;
}
</style>
