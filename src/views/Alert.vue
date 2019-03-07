<template>
  <div class="text-xs-center pl-4">
    <v-badge left>
      <template v-slot:badge>
        <span>{{messageCount}}</span>
      </template>
      <v-icon @click="sendNotifications"
        large
        color="grey lighten-1"
      >
        notifications_none
      </v-icon>
    </v-badge>
  </div>
</template>
<script>
import {db, functions} from "../firebase";
import webPush from "web-push";
const sendNotificationsFunc = functions.httpsCallable('sendNotifications');

export default {
    name:"Alert",
    computed:{
        messageCount(){
            return this.$store.state.messageCount;
        },
    },
    methods: {
        sendNotifications(){
            sendNotificationsFunc();
        }
    }
}
</script>
