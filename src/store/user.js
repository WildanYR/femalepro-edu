import db from '../firestoreConfig'

const initialState = () => {
  return {
    tips: '',
    keluhan: [],
    penyakit: [],
    selectedKeluhan: [],
  }
}

const Collection = {
  tips: 'tips',
  keluhan: 'keluhan',
  penyakit: 'penyakit',
}

export default {
  namespaced: true,
  state: initialState(),
  mutations: {
    setTips(state, data){
      state.tips = data
    },
    setKeluhan(state, data){
      state.keluhan = data
    },
    setPenyakit(state, data){
      state.penyakit = data
    },
    selectKeluhan(state, id){
      const keluhanIndex = state.keluhan.findIndex(item => item.id == id)
      if(state.keluhan[keluhanIndex].selected) state.keluhan[keluhanIndex].selected = false
      else state.keluhan[keluhanIndex].selected = true
    },
    removeSelectedKeluhan(state){
      state.keluhan = state.keluhan.map(item => {
        return {...item, selected: false}
      })
    },

    saveSelectedKeluhan(state){
      state.selectedKeluhan = state.keluhan.filter(item => {
        return item.selected
      }).map(item => {
        return item.text
      })
    },
  },
  actions: {
    getTips({commit, dispatch}){
      return new Promise(async (resolve) => {
        try {
          const snapshots = await db.collection(Collection.tips).get()
          if(snapshots.docs.length){
            const data = snapshots.docs[Math.floor(Math.random() * snapshots.docs.length)].data()
            commit('setTips', data.tips)
          }
        }
        catch(error) {
          console.log(error)
          dispatch('handleRequestError', error, {root: true})
        }
        finally {
          resolve()
        }
      })
    },

    getKeluhan({commit, dispatch}){
      return new Promise(async (resolve) => {
        try {
          const snapshots = await db.collection(Collection.keluhan).get()
          let data = []
          snapshots.forEach(doc => {
            data.push({id: doc.id, ...doc.data()})
          })
          commit('setKeluhan', data)
        }
        catch(error) {
          dispatch('handleRequestError', error, {root: true})
        }
        finally {
          resolve()
        }
      })
    },

    getPenyakit({commit, dispatch, state}){
      return new Promise(async (resolve) => {
        try {
          const snapshots = await db.collection(Collection.penyakit).where('keluhan', 'array-contains-any', state.selectedKeluhan).get()
          let data = []
          snapshots.forEach(doc => {
            data.push({id: doc.id, ...doc.data()})
          })
          commit('setPenyakit', data)
        }
        catch(error) {
          dispatch('handleRequestError', error, {root: true})
        }
        finally {
          resolve()
        }
      })
    },
  }
}