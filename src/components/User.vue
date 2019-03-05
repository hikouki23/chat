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
export default {
  name: "User",
  data() {
    return { users: [], userName: "Anon" };
  },
  methods: {
    saveUser() {
      db.collection("users")
        .doc(this.userName)
        .set({ name: this.userName }, { merge: true }); //vuex
      this.$emit("user-update", { name: this.userName });
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

