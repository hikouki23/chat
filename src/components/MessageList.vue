<template>
  <v-flex>
      <v-card>
        <v-list one-line >
          <template v-for="(message, index) in messages">
            <v-subheader
              :key="message.id"
            >{{new Date(message.date).toLocaleDateString()}} {{new Date(message.date).toLocaleTimeString()}}</v-subheader>
            <v-list-tile :key="message.id">
              <v-chip class="font-weight-medium white--text text--darken-1" v-bind:class="`${message.color || 'grey'}`">
                <v-avatar>
                  <span>{{message.author[0]}}</span>
                </v-avatar>
                {{message.author}}
              </v-chip>
              <v-list-tile-content>
                <v-card-text>{{message.content}}</v-card-text>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if="index + 1 < messages.length" :key="index" inset></v-divider>
          </template>
        </v-list>
      </v-card>
  </v-flex>
</template>

<script>
import db from "../firebase";
import Message from "./Message";
import { mapState } from "vuex";

export default {
  name: "MessageList",
  components: { Message },
  data() {
    return {
      loaded: false,
    };
  },
  computed:{
   ...mapState(["loaded","messages"])
  },
  created() {
    store.dispatch("loadMessages");
  },
  mounted() {
    let mountedDate = Date.now();
    db.collection("messages").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "added" && change.doc.data().date > mountedDate)
          this.messages.push(change.doc.data());
      });
    });
  },
};
</script>

