<template>
  <v-flex>
    <v-subheader class="pa-0 hidden-md-and-up">Profile</v-subheader>
    <v-combobox
      :style="{'width':'100%'}"
      v-model="userName"
      :hint="'Your name here'"
      :items="userNames"
      :label="'User Name'"
      persistent-hint
      prepend-icon="fas fa-edit"
    ></v-combobox>
  </v-flex>
</template>
<script>
import db from "../firebase";
import { mapState } from "vuex";

export default {
  name: "User",
  methods: {},
  computed: {
    ...mapState(["userNames"]),
    userName: {
      get() {
        return this.$store.state.user.name;
      },
      set(value) {
        this.$store.dispatch("saveUser", { ...this.$store.state.user, name: value });
      }
    }
  },
  mounted() {
   this.$store.dispatch("loadUsers");
  }
};
</script>

<style scoped>
>>> input {
  text-transform: capitalize;
}
</style>


