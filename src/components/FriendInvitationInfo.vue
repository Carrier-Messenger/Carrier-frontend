<template>
  <div class="invitation" ref="invitation">
    <p>
      <router-link :to="`/user/${invitation.sender.id}`">{{
        invitation.sender.full_name
      }}</router-link>
      wants to be your friend:
    </p>
    <button @click="accept">Accept</button>
    <button @click="reject">Reject</button>
  </div>
</template>

<script>
import Friend from "@/scripts/friend";

export default {
  name: "FriendInvitationInfo",
  props: {
    invitation: {},
  },
  methods: {
    accept() {
      Friend.accept(this.invitation.sender.id);
      this.$emit("addFriend", this.invitation.sender);
      this.$refs.invitation.style.display = "none";
    },
    reject() {
      Friend.reject(this.invitation.sender.id);
      this.$emit("addFriend", this.invitation.sender);
      this.$refs.invitation.style.display = "none";
    },
  },
};
</script>

<style scoped>
</style>
