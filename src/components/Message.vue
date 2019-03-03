<template>
   <div class="row">
    <div class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input
            v-model="message"
            v-on:keyup.enter="saveMessage"
            v-bind:style="{'text-transform': 'capitalize'}"
            ref="autocompleteTextbox"
            type="text"
            id="autocomplete-input"
            class="autocomplete" >
          <label for="autocomplete-input">Write message</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../firebase";

export default {
  name: "Message",
  props: {
    currentUser: String
  },
  data() {
    return {
      message: ''
    };
  },
  methods: {
    saveMessage(){
      if(this.message)
        db.collection("messages").add({author: this.currentUser, content: this.message, date:Date.now()});
    }
  }
};
</script>

