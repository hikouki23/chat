import Vue from "vue";
import './plugins/vuetify';
import App from "./App.vue";
import User from "./components/User.vue";
import store from './store';
import setup from "./notifications";

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
