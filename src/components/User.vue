<template>
  <div class="row">
    <div class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input
            v-model="user"
            v-on:blur="saveUser"
            v-on:keyup.enter="saveUser"
            v-bind:style="{'text-transform': 'capitalize'}"
            ref="autocompleteTextbox"
            type="text"
            id="autocomplete-input"
            class="autocomplete" >
          <label for="autocomplete-input">Your name here</label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import db from "../firebase";
export default {
  name: "User",
  data() {
    return { users: [], user: "" };
  },
  methods: {
    saveUser() {
      db.collection('users').doc(this.user).set({name:this.user}, {merge:true})
      this.$emit('user-update', this.user);
    }
  },
  mounted() {
      let autocompleteUsers = {};
      db.collection("users")
        .get()
        .then(snapshot => {
          snapshot.forEach(user => {
            autocompleteUsers[user.data().name] = null;
          });
        })
        .then(() => {
          $(this.$refs.autocompleteTextbox).autocomplete({
            data: autocompleteUsers
          });
        });
    }
};
</script>

