<template>
  <v-flex xs12>
      <v-card>
        <v-list one-line>
          <template v-for="(message, index) in messages">
            <v-subheader
              :key="message.id"
            >{{new Date(message.date).toLocaleDateString()}} {{new Date(message.date).toLocaleTimeString()}}</v-subheader>
            <v-list-tile :key="message.id">
              <v-chip>
                <v-avatar v-bind:color="user.color">
                  <span class="black--text">{{message.author[0]}}</span>
                </v-avatar>
                {{message.author}}
              </v-chip>
              <v-list-tile-content>
                <v-list-tile-title v-text="message.content"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if="index + 1 < messages.length" :key="index"></v-divider>
          </template>
        </v-list>
      </v-card>
  </v-flex>
</template>

<script>
import db from "../firebase";
import Message from "./Message.vue";
import store from "../store";

export default {
  name: "MessageList",
  components: { Message },
  data() {
    return {
      loaded: false,
      messages: [],      
    };
  },
  computed:{
    user(){
      return store.state.user;
    }
  },
  created() {

    db.collection("messages")
      .orderBy("date", "asc")
      .limit(10)
      .get()
      .then(snapshot => {
        snapshot.forEach(message => {
          this.messages.push(message.data());
        });
      })
      .then(() => (store.commit('setLoaded')));
  },
  mounted() {
        console.log('created')
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

