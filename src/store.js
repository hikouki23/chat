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
    loaded: false,
    unreadMessages: 0
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
      state.messages.push(message); 
    },
    addUnreadMessage(state){
      state.unreadMessages ++;
    },
    markMessagesAsRead(state){
      state.unreadMessages = 0;
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
    saveMessage({ commit }, message) {
      if (message)
        db.collection("messages").add({
          author: this.state.user.name,
          content: message,
          color: this.state.user.color,
          date: Date.now()
        });
    },
    loadMessages({ dispatch, commit }) {
      db.collection("messages")
        .orderBy("date", "desc")
        .limit(10)
        .get()
        .then(snapshot => {
          let messages = [];
          snapshot.forEach(message => {
            messages.unshift(message.data()); //add in reverse order to avoid getting only the oldest 10 messages
          });
          messages.forEach(message => commit("addMessage", message));
        })
        .then(() => {
          commit('setLoaded');
          dispatch("attachOnMessageAdded");
        });
    },
    attachOnMessageAdded({ commit }) {
      let mountedDate = Date.now();
      db.collection("messages").onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added" && change.doc.data().date > mountedDate)
          {
            commit("addMessage", change.doc.data());
            if(!document.hasFocus())
              commit("addUnreadMessage");
          }
        });
      });
    }
  }
})
