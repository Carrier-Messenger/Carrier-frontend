<template>
  <div class="chat-list-view" v-if="chats">
    <!-- <div class="chat-list-view" v-if="chats.lentgth !== 0"> -->
    <li v-for="(chat, index) in chats" :key="`Chat ${index}`">
      <ChatInfo :chat="chat" />
    </li>
  </div>
</template>

<script>
import ChatInfo from "@/components/ChatInfo.vue";
// import Chat from "@/scripts/chat";

export default {
  name: "ChatList",
  components: {
    ChatInfo,
  },
  // data() {
  //   return {
  //     chats: [],
  //   };
  // },
  props: {
    chats: null,
  },
  // async created() {
  //   this.chats = await Chat.getChats();
  // },
};
</script>

<style scoped>
li {
  list-style-type: none;
  display: flex;
}
</style>
