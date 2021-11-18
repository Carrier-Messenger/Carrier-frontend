<template>
  <div class="chat-info">
    <router-link :to="`/chat/${chat.id}`" class="link">
      <img :src="chat.image" :alt="`Image of ${chat.name}`" />
      <div>
        <p>{{ chat.name }}</p>
        <p class="lastMessage" v-if="chat.last_message">
          {{ chat.last_message.author.first_name }}:
          {{ chat.last_message.content }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ChatInfo",
  props: {
    chat: {},
  },
};
</script>

<style scoped>
.chat-info {
  width: 100%;
}

a {
  display: flex;
}
p {
  color: #FFF6E6;
  font-weight: bold;
  position: relative;
  top: .9vh;
  left: .5vw;
}
img {
  border: 3px solid #3F464D;
  width: 48px;
  height: 48px;
  margin: 10px;
  border-radius: 100%;
}
img:hover {
  border-radius: 30%;
  transition-duration: .5s;
}
</style>
