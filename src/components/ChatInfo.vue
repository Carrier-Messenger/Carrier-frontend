<template>
  <div class="chat-info">
    <router-link :to="`/chat/${chat.id}`">
      <img :src="chat.image" :alt="`Image of ${chat.name}`" />
      <p>{{ chat.name }}</p>
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

img {
  width: 48px;
  height: 48px;
  margin: 10px;
  border-radius: 100%;
}
</style>
