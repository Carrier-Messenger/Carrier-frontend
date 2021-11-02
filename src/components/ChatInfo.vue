<template>
  <div class="chat-info">
    <router-link :to="`/chat/${chat.id}`">
      <img :src="chat.image" :alt="`Image of ${chat.name}`" />
      <div>
        <p>{{ chat.name }}</p>
        <p v-if="chat.last_message">
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

img {
  width: 48px;
  height: 48px;
  margin: 10px;
  border-radius: 100%;
}
</style>
