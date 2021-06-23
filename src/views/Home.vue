<template>
  <div class="relative p-5 bg-blue-900 h-72">
    <div class="relative z-10">
      <h1 class="text-white text-2xl font-bold">Femalepro Edu</h1>
      <div class="text-white mt-4 mb-6">
        <p class="font-semibold">Selamat Datang</p>
        <p>{{tips}}</p>
      </div>
      <button @click="$router.push('/penyakit/cari')" class="py-2 px-8 bg-blue-700 text-white font-medium rounded-full">Tanya Dokter</button>
    </div>
    <div class="absolute right-10 top-16 z-0">
      <img class="h-80" src="@/assets/doctor-circle.svg" alt="doctor">
    </div>
  </div>
  <div class="relative mb-5">
    <div class="absolute -top-4 w-full bg-white p-5 rounded-t-3xl min-h-screen">
      <div class="pt-3">
        <h2 class="text-lg font-medium text-blue-800">Berita Kesehatan Hari Ini</h2>
        <div class="mb-4 w-full flex items-center">
          <div class="w-full border-b border-blue-900"></div>
          <div class="w-3 h-3 rounded-full border border-blue-900"></div>
        </div>
        <div v-if="loading.getBerita" class="flex flex-col justify-center items-center mt-14">
          <Spinner></Spinner>
        </div>
        <div v-else-if="berita.length" class="space-y-5">
          <button v-for="(brt, i) in berita" :key="'berita-'+i" @click="goToBerita(berita.url)" class="bg-gray-200 rounded-xl">
            <img :src="brt.urlToImage || 'https://i.stack.imgur.com/y9DpT.jpg'" class="w-full rounded-t-xl">
            <div class="p-3 text-left">
              <h2 class="text-lg font-medium mb-2">{{brt.title}}</h2>
              <p class="text-sm text-gray-500">{{brt.source}}</p>
            </div>
          </button>
        </div>
        <div v-else>
          <h2 class="text-lg text-center text-gray-400 font-semibold">Sedang tidak ada berita hari ini</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import {useStore} from 'vuex'
import axios from 'axios'
import Spinner from '../components/Spinner.vue'
export default {
  components: {Spinner},
  setup(){
    const store = useStore()

    const loading = ref({
      getBerita: false
    })
    const tips = computed(() => {
      return store.state.user.tips || 'jagalah kesehatan'
    })
    const berita = ref([])

    const goToBerita = (url) => {
      window.open(url, '_blank')
    }

    onMounted(() => {
      loading.value.getBerita = true
      store.dispatch('user/getTips')
      .then(() => {
        return axios.get('https://newsapi.org/v2/top-headlines?country=id&category=health&pageSize=5&apiKey=cc3af9d6ffbc4b4897473c9c6bc2dd6d')
      })
      .then(res => {
        console.log(res)
        berita.value = res.data.articles.map(article => {
          return {
            source: article.source.name,
            title: article.title,
            url: article.url,
            urlToImage: article.urlToImage,
          }
        })
      })
      .finally(() => {
        loading.value.getBerita = false
      })
    })

    return {
      loading,
      berita,
      tips,
      goToBerita
    }
  }
}
</script>
