<template>
  <div class="message">
    <div class="mine-message" v-if="message.is_mine">
      <img
        :src="displayMessageUrl(message.author.pfp)"
        :alt="`Profile picture of ${message.author.full_name}`"
      />
      <p>I wrote at {{ message.created_at }}:</p>
      <p>{{ message.content }}</p>
      <img
        v-for="(image, index) in message.images"
        :src="displayMessageUrl(image.url)"
        :alt="`img-${index}`"
        :key="index"
      />
    </div>
    <div class="not-mine-message" v-else>
      <img
        :src="displayMessageUrl(message.author.pfp)"
        :alt="`Profile picture of ${message.author.full_name}`"
      />
      <p>{{ message.author.full_name }} wrote at {{ message.created_at }}:</p>
      <p>{{ message.content }}</p>
      <img
        v-for="(image, index) in message.images"
        :src="displayMessageUrl(image.url)"
        :alt="`img-${index}`"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import { DOMAIN } from "@/settings";

export default {
  name: "Message",
  props: {
    message: {},
    fromWS: null,
  },
  data() {
    return {
      DOMAIN: DOMAIN,
      realMessage: {},
    };
  },
  methods: {
    displayMessageUrl(url) {
      if (this.fromWS) return DOMAIN.replace(/.$/, "") + url;
      return url;
    },
  },
  mounted() {
    this.realMessage = this.message;

    this.realMessage.created_at = this.message.created_at.toLocaleTimeString(
      "pl-PL",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  },
};
</script>

<style scoped>
.mine-message,
.not-mine-message {
  border: 2px solid #000000;
  padding: 5px;
}

.mine-message {
  text-align: right;
}

img {
  width: 48px;
  height: 48px;
  display: inline;
}
</style>
