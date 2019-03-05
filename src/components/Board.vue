<template>
  <div id="board">
    <Loading v-bind:loaded="loaded"/>
    <v-layout v-if="loaded" row>
      <v-flex>
        <v-card>
          <v-list one-line>
            <User v-on:user-update="updateUser"/>
            <template v-for="(message, index) in messages">
              <v-subheader
                :key="message.id"
              >{{new Date(message.date).toLocaleDateString()}} {{new Date(message.date).toLocaleTimeString()}}</v-subheader>
              <v-list-tile :key="message.id">
                <v-chip>
                  <v-avatar v-bind:color="currentUser.color">
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
        <div id="writeMessage">
          <Message v-bind:currentUser="currentUser"/>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import db from "../firebase";
import Message from "./Message.vue";
import Loading from "../views/Loading.vue";

export default {
  name: "Board",
  components: { Message, Loading },
  data() {
    return {
      loaded: false,
      messages: [],
      currentUser: { name: "Anon", color: "grey" }
    };
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
      .then(() => (this.loaded = true));
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
  methods: {
    updateUser(user) {
      this.currentUser = user;
    }
  }
};
</script>

