<template>
  <div class="userNew" v-if="user">
    <div id="pfpdiv">
      <img
        :src="user.pfp"
        :alt="`${user.full_name} profile picture`"
        id="Userpfp"
      />
    </div>
    <div id="userContent">
      <h1>{{ user.full_name }}</h1>
      <h4>Also known as:</h4>
      <h2>{{ user.username }}</h2>
      <div v-if="logged" id="buttons">
      <button class="linkBlack" v-if="user.friend_type === 'friend'" @click="remove">
        Unfriend
      </button>
      <button class="linkBlack" v-if="user.friend_type === 'none'" @click="invite">
        Invite
      </button>
      <button class="linkBlack" v-if="user.friend_type === 'invited'" @click="cancel">
        Cancel request
      </button>
      <div v-if="user.friend_type === 'requested'">
        <button @click="accept">
          <p>Accept invitation</p>
        </button>
        <button @click="reject">
          <p>Reject invitation</p>
        </button>
      </div>
    </div>
    </div>
    
  </div>
</template>

<script>
import User from "@/scripts/user.js";
import JWT from "@/scripts/jwt.js";
import Friend from "@/scripts/friend.js";
import jwt_decode from "jwt-decode";

export default {
  name: "User",
  data() {
    return {
      user: null,
      logged: false,
    };
  },
  methods: {
    invite() {
      Friend.invite(this.user.id);
      this.user.friend_type = "invited";
    },
    cancel() {
      Friend.cancel(this.user.id);
      this.user.friend_type = "none";
    },
    remove() {
      Friend.remove(this.user.id);
      this.user.friend_type = "none";
    },
    accept() {
      Friend.accept(this.user.id);
      this.user.friend_type = "friend";
    },
    reject() {
      Friend.reject(this.user.id);
      this.user.friend_type = "none";
    },
  },
  async mounted() {
    this.logged = JWT.isLogged();

    this.user = await User.getUserInfo(this.$route.params.id);

    if (this.user.id === jwt_decode(JWT.getRawToken()).user_id)
      this.$router.push({ name: "Self" });
  },
};
</script>


<style scoped>
#info {
  text-align: center;
}

#pfp {
  width: 256px;
  height: 256px;
}

#pfpdiv {
  text-align: center;
}

#buttons {
  text-align: center;
}
</style>
