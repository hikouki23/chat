<template>
  <v-flex v-ripple>
    <v-card class="pa-3 mt-2">
      <v-text-field
        append-icon="close"
        v-on:click:append="clearMessage"
        v-model="message"
        v-on:keyup.enter="saveMessage"
        label="Write your message"
        autofocus
      ></v-text-field>
    </v-card>
  </v-flex>
</template>

<script>
import db from "../firebase";

export default {
  name: "Message",
  data() {
    return {
      message: ""
    };
  },
  methods: {
    saveMessage() {
      this.$store.dispatch("saveMessage", this.message).then(()=> this.clearMessage()).catch(err=>console.error(`Couldn't send message${err}`));
    },
    clearMessage() {
      this.message = "";
    }
  }
};
</script>