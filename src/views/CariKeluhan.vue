<template>
  <div class="flex justify-center items-center pt-5 bg-blue-700">
    <img src="@/assets/doctor-work.svg" alt="doctor work">
  </div>
  <div class="relative">
    <div class="absolute -top-4 w-full bg-white pt-8 px-6 rounded-t-3xl">
      <h1 class="text-xl text-blue-500 font-bold mb-3">Keluhan yang dirasakan?</h1>
      <div class="flex justify-between items-center w-full px-2 py-1 text-md text-black bg-white border border-gray-400 rounded focus-within:ring-1 focus-within:ring-yellow-500 focus-within:border-yellow-500 focus-within:bg-yellow-100">
        <input v-model="cariKeluhan" type="text" placeholder="cari keluhan" class="bg-transparent focus:placeholder-yellow-500">
        <button @click="cariKeluhan = ''" class="p-2 active:bg-yellow-50 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="py-3 my-5 mb-10 space-y-3 disable-scrollbar max-h-72 overflow-y-scroll">
        <div v-if="loading.getKeluhan" class="flex flex-col justify-center items-center mt-14">
          <Spinner></Spinner>
        </div>
        <div v-else-if="keluhanData.length != 0" class="space-y-3">
          <button v-for="keluhan in keluhanData" :key="keluhan.id" @click="selectKeluhan(keluhan.id)" :class="[keluhan.selected?'bg-blue-500 text-white':'bg-blue-50']" class="flex justify-start items-center w-full px-3 py-1 font-medium border border-blue-500 rounded-md">
            {{keluhan.text}}
          </button>
        </div>
        <!-- <div v-else class="flex flex-col justify-center items-center">
          <img src="@/assets/nodata.svg" alt="no data" class="w-full h-32 mb-5">
          <p class="text-lg text-gray-400">No Data</p>
        </div> -->
      </div>
    </div>
  </div>
  <button @click="cariPenyakit" class="fixed bottom-0 w-full py-2 bg-blue-900 text-white font-bold active:bg-blue-500 md:max-w-screen-sm">Cari Penyakit</button>
</template>

<script>
import {computed, onMounted, ref} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import Spinner from '../components/Spinner.vue'
export default {
  components: {Spinner},
  setup(){
    const store = useStore()
    const router = useRouter()

    const loading = ref({
      getKeluhan: false
    })
    const validate = ref({
      keluhan: false
    })
    const cariKeluhan = ref('')

    const keluhanData = computed(() => {
      if(store.state.user.keluhan.length == 0) return []
      if(!cariKeluhan.value){
        const selectedKeluhan = store.state.user.keluhan.filter(item => item.selected)
        // const listKeluhan = store.state.user.keluhan.filter(item => !item.selected)
        // listKeluhan.unshift(...selectedKeluhan)
        // return listKeluhan
        return selectedKeluhan
      }
      const keluhanList = store.state.user.keluhan.filter(item => item.text.includes(cariKeluhan.value))
      return keluhanList
    })

    const selectKeluhan = (id) => {
      store.commit('user/selectKeluhan', id)
      cariKeluhan.value = ''
    }

    const cariPenyakit = () => {
      store.commit('user/saveSelectedKeluhan')
      if(store.state.user.selectedKeluhan.length == 0){
        validate.value.keluhan = true
        console.log('ok')
        return
      }
      router.push('/penyakit')
      store.commit('user/removeSelectedKeluhan')
    }

    onMounted(() => {
      loading.value.getKeluhan = true
      store.dispatch('user/getKeluhan')
      .then(() => {loading.value.getKeluhan = false})
    })

    return {
      loading,
      keluhanData,
      selectKeluhan,
      cariPenyakit,
      validate,
      cariKeluhan
    }
  }
}
</script>