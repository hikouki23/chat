<template>
  <div id="board">
    <div v-if="!loaded" class="preloader-wrapper big active">
      <div class="spinner-layer spinner-red-only">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
    <ul v-if="loaded" class="collection with-header">
      <User v-on:user-update="updateUser"/>
      <li class="collection-header">
        <h3>Messages</h3>
      </li>
      <li class="collection-item" v-for="message in messages" v-bind:key="message.id">
        <div class="chip">{{message.author}}</div>
        {{message.content}}
      </li>
    </ul>
    <div id="writeMessage">
      <Message v-bind:currentUser="currentUser"/>
    </div>
  </div>
</template>

<script>
import db from "../firebase";
import User from "./User.vue";
import Message from "./Message.vue";

export default {
  name: "Board",
  components: { User, Message },
  data() {
    return {
      loaded: false,
      messages: [],
      currentUser: 'Anon'
    };
  },
  created() {
    db.collection("messages")
    .orderBy('date', 'desc').limit(10)
      .get()
      .then(snapshot => {
        snapshot.forEach(message => {
          console.log(message.data());
          this.messages.push(message.data());
        });
      })
      .then(() => (this.loaded = true));
  },
  mounted(){
    let mountedDate = Date.now();
    db.collection("messages").onSnapshot(
      snapshot=>{
        snapshot.docChanges().forEach(
          change=> {
            if(change.type === 'added' && change.doc.data().date > mountedDate)
             this.messages.push(change.doc.data());
          })
      }
    )
  },
  methods:
  {
    updateUser(user){
      this.currentUser = user;
    }
  }
};
</script>

