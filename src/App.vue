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
import store from "./store";

export default {
  name: "App",
  components: {
    Board,
    Loading,
    Toolbar
  },
  computed: {
    loaded() {
      return store.state.loaded;
    }
  }
};
</script>
