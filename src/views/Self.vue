<template>
  <div class="user backgroundMain" v-if="user">
    <div id="pfpdiv">
      <img
        :src="user.pfp"
        :alt="`${user.full_name} profile picture`"
        id="pfp"
      />
    </div>
    <div id="nonpfp">
      
      <div id="info">
        <h2>{{ user.full_name }}</h2>
        <h4>Also known as:</h4>
        <h2>{{ user.username }}</h2>
      </div>
    </div>
    <FriendList :friends="user.friends" />
    <FriendInvitationList @addFriend="addFriend($event)" />
    <div id="invitation-list">
        <InvitationList
          v-if="user.chatroom_invitations.length !== 0"
          :invitations="user.chatroom_invitations"
        />
    </div>
  </div>
</template>

<script>
import User from "@/scripts/user.js";
import FriendList from "@/components/FriendList";
import InvitationList from "@/components/InvitationList";
import FriendInvitationList from "@/components/FriendInvitationList";

export default {
  name: "User",
  data() {
    return {
      user: null,
    };
  },
  components: {
    FriendList,
    InvitationList,
    FriendInvitationList,
  },
  methods: {
    addFriend(friend) {
      this.user.friends.push(friend);
    },
  },
  async mounted() {
    this.user = await User.getMeInfo();
  },
};
</script>


<style scoped>
</style>
