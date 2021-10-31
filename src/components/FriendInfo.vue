<template>
  <div class="friend">
    <router-link :to="`/user/${friend.id}`">
      <img :src="friend.pfp" :alt="`Profile picture of ${friend.full_name}`" />
      <p>{{ friend.full_name }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "FriendInfo",
  props: {
    friend: {},
  },
};
</script>

<style scoped>
img {
  width: 48px;
  height: 48px;
}

a {
  display: flex;
}
</style>