<template>
  <div id="friend-list">
    <h2>Invitations:</h2>
    <FriendInvitationInfo
      v-for="(invitation, index) in invitations"
      :key="index"
      :invitation="invitation"
      @addFriend="addFriend($event)"
    />
  </div>
</template>

<script>
import FriendInvitationInfo from "@/components/FriendInvitationInfo";
import User from "@/scripts/user";

export default {
  name: "FriendInvitationList",
  data() {
    return {
      invitations: [],
    };
  },
  components: {
    FriendInvitationInfo,
  },
  methods: {
    addFriend(friend) {
      this.$emit("addFriend", friend);
    },
  },
  async beforeCreate() {
    this.invitations = await User.getFriendInvitations();
  },
};
</script>

<style scoped>
</style>
