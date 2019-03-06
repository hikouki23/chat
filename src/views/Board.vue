<template>
  <v-container grid-list-md>
    <v-layout row wrap>
        <User/>
        <MessageList />
        <Message />
    </v-layout>
  </v-container>
</template>

<script>
import MessageList from "../components/MessageList.vue";
import User from "../components/User.vue";
import Message from "../components/Message.vue";

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

