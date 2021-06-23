import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import admin from './admin'
import user from './user'

const initialState = () => {
  return {
    errorAlert: false,
    errorMessage: ''
  }
}

export default createStore({
  state: initialState(),
  mutations: {
    resetState(state){
      Object.assign(state, initialState())
    },

    openAlert(state, msg){
      state.errorAlert = true
      state.errorMessage = msg
    },

    closeAlert(state){
      state.errorAlert = false
      state.errorMessage = ''
    }
  },
  actions: {
    handleRequestError({commit}, error){
      console.log(error)
      commit('openAlert', "terjadi masalah dengan database")
      // if (error.response) {
      //   console.log('Error: ', error.response.data.messages)
      //   commit('openAlert', error.response.data.messages)
      // } else if (error.request) {
      //   console.log('Error: no response from server')
      //   commit('openAlert', 'no response from server')
      // } else {
      //   console.log(error.message)
      //   commit('openAlert', error.message)
      // }
    },
  },
  modules: {admin, user},
  plugins: [createPersistedState()]
})
