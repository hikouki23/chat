import Vue from 'vue'
import Vuex from 'vuex'
import db from './firebase';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: 'Anon',
      color: 'Black'
    },
    userNames: ['Anon'],
    users: new Map(),
    messages: [],
    loaded: false
  },
  mutations: {
    updateUser(state, user) {
      state.user = user;
    },
    setLoaded(state) {
      state.loaded = true;
    },
    addUser(state, user) {
      if (!state.users.has(user.name))
        state.userNames.push(user.name);

      state.users.set(user.name, user);
    },
    addMessage(state, message) {
      state.messages.unshift(message); //add to the top
    }
  },
  actions: {
    saveUser({ commit }, user) {
      db.collection("users")
        .doc(user.name)
        .set(user, { merge: true }).then(() => commit("addUser", user));
      commit("updateUser", user);
    },
    loadUsers({ commit }) {
      db.collection("users")
        .get()
        .then(snapshot => {
          snapshot.forEach(user => {
            commit("addUser", user.data());
          });
        });
    },
    loadMessages({ commit }) {
      db.collection("messages")
        .orderBy("date", "desc")
        .limit(10)
        .get()
        .then(snapshot => {
          snapshot.forEach(message => {
            commit("addMessage", message);
          });
        })
        .then(() => (commit('setLoaded')));
    }
  }
})
