import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: 'Anon',
      color: 'Black'
    },
    loaded: false
  },
  mutations: {
    updateUser(state, user){
      state.user = user;
    },
    setLoaded(state){
      state.loaded = true;
    }
  },
  actions: {

  }
})
