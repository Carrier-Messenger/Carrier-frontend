<template>
  <div id="friend-list">
    <FriendInfo
      v-for="(friend, index) in friends"
      :key="index"
      :friend="friend"
    />
  </div>
</template>

<script>
import FriendInfo from "@/components/FriendInfo.vue";

export default {
  name: "FriendList",
  components: {
    FriendInfo,
  },
  props: {
    friends: null,
  },
};
</script>

<style scoped>
</style>
