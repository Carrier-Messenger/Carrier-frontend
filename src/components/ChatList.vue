<template>
  <div class="chat-list-view" v-if="chats">
    <li v-for="(chat, index) in chats" :key="`Chat ${index}`">
      <ChatInfo :chat="chat" />
    </li>
  </div>
</template>

<script>
import ChatInfo from "@/components/ChatInfo.vue";

export default {
  name: "ChatList",
  components: {
    ChatInfo,
  },
  props: {
    chats: null,
  },
};
</script>

<style scoped>
li {
  list-style-type: none;
  display: flex;
}
</style>
