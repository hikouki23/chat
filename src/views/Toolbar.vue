<template>
  <v-toolbar app class="py-1">
    <v-toolbar-title class="headline text-uppercase">
      <Title />
      <span>Hikouki</span>
      <span class="font-weight-light">Chat</span>
    </v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items class="hidden-sm-and-down">
      <User/>
      <v-btn flat href="https://github.com/hikouki23/chat" target="_blank">
        <div>
          <i class="fab fa-github mr-1"></i>
          <span>2.0</span>
        </div>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import User from "../components/User";
import store from "../store";
import Title from "./Title";

export default {
  name: "Toolbar",
  components: { User, Title }
};
</script>

<style scoped>
>>> i.fab {
  font-size: 2.5em;
}
</style>

