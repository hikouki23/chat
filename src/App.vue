<template>
  <v-app>
    <Toolbar/>
    <v-content>
      <Board v-show="loaded"/>
      <Loading/>
    </v-content>
  </v-app>
</template>

<script>
import Board from "./views/Board";
import Toolbar from "./views/Toolbar";
import Loading from "./views/Loading";

export default {
  name: "App",
  components: {
    Board,
    Loading,
    Toolbar,
  },
  computed: {
    loaded() {
      return this.$store.state.loaded;
    }
  },
  watch: {
    unreadMessages(){
      if(this.$store.state.unreadMessages > 0)
        document.title = document.title + `Unread messages(${this.$store.state.unreadMessages}`;
    }
  }
};
</script>
