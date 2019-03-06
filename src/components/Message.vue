<template>
  <v-flex>
    <v-card>
      <v-text-field append-icon="close" v-on:click:append="clearMessage" v-model="message" v-on:keyup.enter="saveMessage" label="Write your message">
      </v-text-field>
    </v-card>
  </v-flex>
</template>

<script>
import db from "../firebase";
import store from "../store";

export default {
  name: "Message",
  data() {
    return {
      message: ""
    };
  },
  methods: {
    saveMessage() {
      if (this.message)
        db.collection("messages").add({
          author: store.state.user.name,
          content: this.message,
          date: Date.now()
        });

      this.message = "";
    },
    clearMessage() {
      this.message = "";
    }
  }
};
</script>

