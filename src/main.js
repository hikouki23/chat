import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import User from "./components/User.vue";

new Vue({
  render: h => h(App)
}).$mount("#app");
