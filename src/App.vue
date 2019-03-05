<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Hikouki</span>
        <span class="font-weight-light">Chat</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">2.0</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <Board/>
    </v-content>
  </v-app>
</template>

<script>
import Board from './views/Board'

export default {
  name: 'App',
  components: {
    Board
  },
  data () {
    return {
      //
    }
  }
}
</script>
