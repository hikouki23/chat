<template>
  <v-toolbar app extension-height="auto">
    <v-toolbar-title class="headline text-uppercase">
      <span>Hikouki</span>
      <span class="font-weight-light">Chat</span>
    </v-toolbar-title>
    <v-toolbar-items class="hidden-sm-and-down">
      <User/>
    </v-toolbar-items>
    <v-btn flat href="https://github.com/hikouki23/chat" target="_blank">
      <span class="mr-2">2.0</span>
    </v-btn>
  </v-toolbar>
</template>

<script>
import User from "../components/User";
export default {
  name: "Toolbar",
  components: { User }
};
</script>
