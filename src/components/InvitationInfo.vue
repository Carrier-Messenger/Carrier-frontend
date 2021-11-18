<template>
  <div class="invitation-info" ref="all">
    <img
      :src="invitation.chatroom.image"
      :alt="`Image of ${invitation.name}`"
    />
    <p>{{ invitation.chatroom.name }}</p>
    <p>From {{ invitation.sender.full_name }}</p>
    <button class="adminLink" @click="accept">
      Accept
    </button>
    <button class="adminLink" @click="reject">
      Reject
    </button>
  </div>
</template>

<script>
import Chat from "@/scripts/chat";

export default {
  name: "InvitationInfo",
  props: {
    invitation: {},
  },
  methods: {
    accept() {
      Chat.accept(this.invitation.chatroom.id);
      this.$refs.all.style.display = "none";
    },
    reject() {
      Chat.reject(this.invitation.chatroom.id);
      this.$refs.all.style.display = "none";
    },
  },
};
</script>

<style scoped>
</style>
