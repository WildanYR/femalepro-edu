<template>
  <button @click="$router.go(-1)" class="m-5 text-gray-400 flex items-center space-x-1">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
    <p class="text-sm align-baseline">daftar penyakit</p>
  </button>
  <h1 class="text-2xl text-center font-bold my-16 text-blue-800">{{penyakitData.nama}}</h1>
  <div class="px-10 mb-8">
    <div class="space-y-5">
      <p>{{penyakitData.deskripsi}}</p>
      <div>
        <h2 class="text-lg font-medium text-blue-800">Diagnosa</h2>
        <div class="mb-2 w-full flex items-center">
          <div class="w-full border-b border-gray-500"></div>
          <div class="w-3 h-3 rounded-full border border-gray-500"></div>
        </div>
        <p>{{penyakitData.diagnosa}}</p>
      </div>
      <div>
        <h2 class="text-lg font-medium text-blue-800">Saran Pengobatan</h2>
        <div class="mb-2 w-full flex items-center">
          <div class="w-full border-b border-gray-500"></div>
          <div class="w-3 h-3 rounded-full border border-gray-500"></div>
        </div>
        <p>{{penyakitData.saran_pengobatan}}</p>
      </div>
      <button @click="openMaps" class="py-3 w-full text-lg text-green-500 focus:bg-green-100">cari rumah sakit terdekat</button>
    </div>
  </div>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
import { useRoute } from 'vue-router'
import geolocation from '../services/geolocation'
export default {
  setup(){
    const store = useStore()
    const route = useRoute()

    const penyakitData = computed(() => {
      return store.state.user.penyakit.find(item => item.id == route.query.id)  
    })

    const openMaps = () => {
      if(geolocation.checkSupport()){
        geolocation.getCurrentLocation()
        .then(loc => {
          const {latitude,longitude} = loc
          window.open(`https://www.google.com/maps/search/rumah+sakit/@${latitude},${longitude},12z`, '_blank')
        })
        .catch(err => {
          
        })
      }else{
        window.open('https://www.google.com/maps/search/rumah+sakit', '_blank')
      }
    }

    return {
      penyakitData,
      openMaps
    }
  }
}
</script>