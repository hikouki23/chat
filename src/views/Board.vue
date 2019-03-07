<template>
  <v-container fluid>
    <v-layout wrap column>
      <User class="hidden-md-and-up" :style="{'padding-bottom': '1em'}"/>
      <MessageList/>
      <Message/>
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
  }
};
</script>

