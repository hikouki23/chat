<template>
  <v-flex xs 6>
    <v-card>
      <v-card-text>
        <v-subheader class="pa-0">Profile</v-subheader>
        <v-combobox
          v-model="userName"
          :hint="'Your name here'"
          :items="users"
          :label="'User Name'"
          @keyup.enter="saveUser"
          v-on:blur="saveUser"
          persistent-hint
          prepend-icon="fas fa-edit"
          v-bind:style="{'text-transform': 'capitalize'}"
        ></v-combobox>
      </v-card-text>
    </v-card>
  </v-flex>
</template>
<script>
import db from "../firebase";
import store from "../store";
export default {
  name: "User",
  data() {
    return { users: [], userName: store.state.user.name };
  },
  methods: {
    saveUser() {
      let user = {name: this.userName, color:'grey'}
      db.collection("users")
        .doc(this.userName)
        .set(user, { merge: true }); 
      store.commit('updateUser', user);
    }
  },
  mounted() {
    db.collection("users")
      .get()
      .then(snapshot => {
        snapshot.forEach(user => {
          this.users.push(user.data().name);
        });
      });
  }
};
</script>

