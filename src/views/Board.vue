<template>
  <v-container fluid>
    <v-layout wrap>
        <User class="hidden-m-and-up"/>
        <MessageList />
        <Message />
    </v-layout>
  </v-container>
</template>

<script>
import MessageList from "../components/MessageList";
import User from "../components/User";
import Message from "../components/Message";

export default {
  name: "Board",
  components: { MessageList, User, Message },
  data() {
    return {
      messages: [],
      currentUser: { name: "Anon", color: "grey" }
    };
  },
};
</script>

