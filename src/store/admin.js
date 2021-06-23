import db from '../firestoreConfig'

const Collection = {
  tips: 'tips',
  keluhan: 'keluhan',
  penyakit: 'penyakit',
}

const initialState = () => {
  return {
    tips: [],
    penyakit: [],
    keluhan: [],
  }
}

export default {
  namespaced: true,
  state: initialState(),
  mutations: {
    resetState(state){
      Object.assign(state, initialState())
    },

    setTips(state, data){
      state.tips = data
    },

    setKeluhan(state, data){
      state.keluhan = data
    },

    setPenyakit(state, data){
      state.penyakit = data
    },

    addTips(state, data){
      state.tips.unshift(data)
    },

    addKeluhan(state, data){
      state.keluhan.unshift(data)
    },

    addPenyakit(state, data){
      state.penyakit.unshift(data)
    },
    
    updatePenyakit(state, payload){
      const penyakitIndex = state.penyakit.findIndex(item => item.id == payload.id)
      state.penyakit[penyakitIndex] = payload.data
    },

    deleteTips(state, id){
      const newData = state.tips.filter(item => {
        return item.id != id
      })
      state.tips = newData
    },
    
    deletePenyakit(state, id){
      const newData = state.penyakit.filter(item => {
        return item.id != id
      })
      state.penyakit = newData
    },

    deleteKeluhan(state, id){
      const newData = state.keluhan.filter(item => {
        return item.id != id
      })
      state.keluhan = newData
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
    }
  },
  actions: {
    getTips({commit, dispatch}){
      return new Promise(async (resolve) => {
        try {
          const snapshots = await db.collection(Collection.tips).get()
          let data = []
          snapshots.forEach(doc => {
            data.push({id: doc.id, ...doc.data()})
          })
          commit('setTips', data)
        }
        catch(error) {
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

    getPenyakit({commit, dispatch}){
      return new Promise(async (resolve) => {
        try {
          const snapshots = await db.collection(Collection.penyakit).get()
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

    addTips({commit, dispatch}, data){
      const newData = {...data}
      return new Promise(async (resolve) => {
        try {
          const snapshots = await db.collection(Collection.tips).add(newData)
          newData.id = snapshots.id
          commit('addTips', newData)
        }
        catch(error) {
          dispatch('handleRequestError', error, {root: true})
        }
        finally {
          resolve()
        }
      })
    },

    addKeluhan({commit, dispatch}, data){
      const newData = {...data}
      return new Promise(async (resolve) => {
        try {
          const snapshots = await db.collection(Collection.keluhan).add(newData)
          newData.id = snapshots.id
          commit('addKeluhan', newData)
        }
        catch(error) {
          dispatch('handleRequestError', error, {root: true})
        }
        finally {
          resolve()
        }
      })
    },

    addPenyakit({commit, dispatch}, data){
      const newData = {...data}
      return new Promise(async (resolve) => {
        try {
          const snapshots = await db.collection(Collection.penyakit).add(newData)
          newData.id = snapshots.id
          commit('addPenyakit', newData)
        }
        catch(error) {
          dispatch('handleRequestError', error, {root: true})
        }
        finally {
          resolve()
        }
      })
    },

    updatePenyakit({commit, dispatch}, payload){
      return new Promise(async (resolve) => {
        try {
          await db.collection(Collection.penyakit).doc(payload.id).update(payload.data)
          commit('updatePenyakit', payload)
        }
        catch(error) {
          dispatch('handleRequestError', error, {root: true})
        }
        finally {
          resolve()
        }
      })
    },

    deleteTips({commit, dispatch}, id){
      return new Promise(async (resolve) => {
        try {
          await db.collection(Collection.tips).doc(id).delete()
          commit('deleteTips', id)
        }
        catch(error) {
          dispatch('handleRequestError', error, {root: true})
        }
        finally {
          resolve()
        }
      })
    },
    
    deletePenyakit({commit, dispatch}, id){
      return new Promise(async (resolve) => {
        try {
          await db.collection(Collection.penyakit).doc(id).delete()
          commit('deletePenyakit', id)
        }
        catch(error) {
          dispatch('handleRequestError', error, {root: true})
        }
        finally {
          resolve()
        }
      })
    },
    
    deleteKeluhan({commit, dispatch}, id){
      return new Promise(async (resolve) => {
        try {
          await db.collection(Collection.keluhan).doc(id).delete()
          commit('deleteKeluhan', id)
        }
        catch(error) {
          dispatch('handleRequestError', error, {root: true})
        }
        finally {
          resolve()
        }
      })
    },
  },
}