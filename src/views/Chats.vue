<template>
  <div id="chatbox">
    <div id="chat-list">
      <ChatList :chats="chats" />
      <router-link to="/chat/create" id="create-href">Create chat</router-link>
    </div>
    <div id="current-chat">
      <router-view
        :key="$route.fullPath"
        @removechat="removeChat($event)"
        @addchat="addChat($event)"
        @changelastmessage="changelastmessage($event)"
      ></router-view>
    </div>
  </div>
</template>

<script>
import ChatList from "@/components/ChatList.vue";
import Chat from "@/scripts/chat";

export default {
  name: "ChatBox",
  components: {
    ChatList,
  },
  methods: {
    sortChats() {
      this.chats.sort(function (a, b) {
        if (a.last_message && b.last_message)
          return (
            new Date(b.last_message.created_at) -
            new Date(a.last_message.created_at)
          );
      });
    },
    removeChat(id) {
      this.chats.forEach((chat, index) => {
        if (chat.id == id) {
          this.chats.splice(index, 1);
        }
      });
    },
    addChat(chat) {
      this.chats.unshift(chat);
    },
    changelastmessage(data) {
      this.chats.forEach((chat) => {
        if (chat.id == data.id) {
          chat.last_message = data.message;
        }
      });
      this.sortChats();
    },
  },
  data() {
    return {
      chats: null,
    };
  },
  async beforeCreate() {
    this.chats = await Chat.getChats();

    this.sortChats();

    if (this.chats.length !== 0) {
      this.$router.push({ name: "ChatID", params: { id: this.chats[0].id } });
    }
  },
};
</script>

<style scoped>
#chatbox {
  display: flex;
  height: calc(100vh - 48px);
}

#chat-list {
  background-color: rgb(160, 160, 160);
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

#current-chat {
  flex: 6;
}

div {
  height: 100%;
}

#create-href {
  position: absolute;
  bottom: 0%;
}
</style>
