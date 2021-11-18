<template>
  <div class="invitation-list-view" v-if="invitations.length !== 0">
    <ul v-for="(invitation, index) in invitations" :key="`Invitation ${index}`">
      <li><InvitationInfo :invitation="invitation" /></li>
    </ul>
  </div>
</template>

<script>
import InvitationInfo from "@/components/InvitationInfo.vue";

export default {
  name: "InvitationList",
  components: {
    InvitationInfo,
  },
  props: {
    invitations: null,
  },
};
</script>

<style scoped>
</style>
