import Vue from "vue";
import Router from "vue-router";
import Board from "./components/Board.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "board",
      component: Board
    },
      ]
});
