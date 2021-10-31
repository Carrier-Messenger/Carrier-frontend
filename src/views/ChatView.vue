<template>
  <div id="chat" v-if="chat" ref="chat">
    <div id="messages">
      <h1>Welcome in {{ chat.name }}</h1>
      <button id="load-more" @click="loadMoreMessages" v-if="!loadedAll">
        Load more messages
      </button>
      <p v-else>Looks like there are no more messages</p>
      <Message
        v-for="(message, index) in messages"
        :key="index"
        :message="message"
        :fromWS="false"
      />
      <Message
        v-for="(message, index) in WSMessages"
        :key="index"
        :message="message"
        :fromWS="true"
      />
      <div id="input">
        <input type="text" v-model="message" />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
    <div id="user-section">
      <UserList :chat="chat" />
      <button @click="leave">Leave chat</button>
      <button @click="deleteChat" v-if="chat.is_admin">Delete chat</button>
    </div>
  </div>
</template>

<script>
import Chat from "@/scripts/chat";
import Message from "@/components/Message";
import { WSDOMAIN, LIMIT } from "@/settings";
import JWT from "@/scripts/jwt";
import UserList from "@/components/UserList";

export default {
  name: "ChatView",
  components: {
    Message,
    UserList,
  },
  data() {
    return {
      chat: null,
      messages: [],
      WSMessages: [],

      message: "",

      offset: 0,
      limit: LIMIT,
      lastMessage: 0,

      loadedAll: false,

      socket: WebSocket,
    };
  },
  methods: {
    sendMessage() {
      this.socket.send(JSON.stringify({ message: this.message }));
    },
    async leave() {
      Chat.leave(this.$route.params.id);
      this.$router.push({ name: "ChatView" });
      this.$emit("removechat", this.$route.params.id);
    },
    async deleteChat() {
      Chat.delete(this.$route.params.id);
      this.$router.push({ name: "ChatView" });
      this.$emit("removechat", this.$route.params.id); 
    },
    async loadMoreMessages() {
      const newMessages = (
        await Chat.getChatMessages(
          this.$route.params.id,
          this.offset,
          this.limit,
          this.lastMessage
        )
      ).reverse();

      if (newMessages.length < this.limit) {
        this.loadedAll = true;
      }

      this.messages = newMessages.concat(this.messages);
      this.offset += this.limit;
    },
  },
  async beforeCreate() {
    this.chat = await Chat.getChatInfo(this.$route.params.id);

    this.socket = new WebSocket(
      `${WSDOMAIN}ws/chat/${
        this.$route.params.id
      }/?token=${await JWT.getToken()}`
    );
    this.socket.onmessage = (e) => {
      const messageJSON = JSON.parse(e.data);
      this.WSMessages.push(messageJSON);
    };
    this.socket.onclose = () => {
      alert("You have problems with internet connection.");
      this.$router.push({ name: "ChatView" });
    };

    this.messages = (
      await Chat.getChatMessagesFirst(this.$route.params.id, 0, this.limit)
    ).reverse();

    if (this.messages.length < this.limit) {
      this.loadedAll = true;
      return;
    }

    this.lastMessage = this.messages[this.messages.length - 1].id;
    this.offset += this.limit;
  },
};
</script>

<style scoped>
div#input {
  position: absolute;
  bottom: 10px;
}

#messages {
  flex: 3;
  overflow: scroll;
  overflow-x: hidden;
  max-height: 100%;
}

h1 {
  display: inline-block;
}

#chat {
  max-height: 100%;
  display: flex;
}

#user-section {
  flex: 1;
}

#load-more {
  display: block;
  margin: 0 0 10px 10px;
}

#leave {
  position: absolute;
  bottom: 0;
}
</style>