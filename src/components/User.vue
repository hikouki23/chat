<template>
     <span>
        <v-subheader class="pa-0 hidden-md-and-up">Profile</v-subheader>
        <v-combobox :style="{'width':'100%'}"
          v-model="userName"
          :hint="'Your name here'"
          :items="userNames"
          :label="'User Name'"
          @keyup.enter="saveUser"
          v-on:focusout="saveUser"
          persistent-hint
          prepend-icon="fas fa-edit"
        ></v-combobox>
        </span>
</template>
<script>
import db from "../firebase";
import	_ from "lodash";

export default {
  name: "User",
  data() {
    return { users: [], userName: this.$store.state.user.name };
  },
  methods: {
    saveUser() {
      let user = _.find(this.users, ['name', this.userName]) || {name: this.userName, color:'grey'}
      db.collection("users")
        .doc(this.userName)
        .set(user, { merge: true }); 
      this.$store.commit('updateUser', user);
    }
  },
  computed: {
    userNames(){
      return this.users.map(user=> {return user.name});
    }
  },
  mounted() {
    db.collection("users")
      .get()
      .then(snapshot => {
        snapshot.forEach(user => {
          this.users.push(user.data());
        });
      });
  }
};
</script>

<style scoped>
>>>input{
  text-transform: capitalize;
}
</style>


