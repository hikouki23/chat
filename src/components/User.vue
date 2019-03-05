<template>
  <v-card>
    <v-card-text>
      <v-subheader class="pa-0">Profile</v-subheader>
      <v-autocomplete
        v-model="userName"
        :hint="'Your name here'"
        :items="users"
        :label="'User Name'"
        persistent-hint
        prepend-icon="fas fa-edit"
      ></v-autocomplete>
    </v-card-text>
  </v-card>
  <!-- v-bind:style="{'text-transform': 'capitalize'}">-->
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
        .doc(this.user)
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

