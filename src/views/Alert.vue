<template>
  <div class="text-xs-center pl-2">
    <v-badge right>
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
import request from "request";

export default {
    name:"Alert",
    computed:{
        messageCount(){
            return this.$store.state.messageCount;
        },
    },
    methods: {
        sendNotifications(){
           request("http://shsdevgrodrig1.sgdcelab.sabre.com:8081/sendNotifications", (err, res, body)=>{
               console.log(body);
           }); 
        }
    }
}
</script>
<style scoped>
>>>.v-badge__badge{
    right:-11px;
}
</style>
