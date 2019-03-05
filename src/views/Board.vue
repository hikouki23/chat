<template>
  <v-container grid-list-md>
    <v-layout row wrap>
        <User v-on:user-update="updateUser"/>
        <MessageList v-bind:currentUser="currentUser"/>
        <Message v-bind:currentUser="currentUser"/>
    </v-layout>
  </v-container>
</template>

<script>
import MessageList from "../components/MessageList.vue";
import User from "../components/User.vue";
import Message from "../components/Message.vue";
import Loading from "./Loading.vue";

export default {
  name: "Board",
  components: { MessageList, User, Message, Loading },
  data() {
    return {
      messages: [],
      currentUser: { name: "Anon", color: "grey" }
    };
  },
  methods: {
    updateUser(user){

    }
  }
};
</script>

