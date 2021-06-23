<template>
  <div class="relative p-5 bg-blue-900 h-40">
    <img class="absolute -right-10 top-10" src="@/assets/circle.svg" alt="just circle decoration">
    <h1 class="text-white text-xl font-bold">Daftar Penyakit</h1>
  </div>
  <div class="relative mb-5">
    <div class="absolute -top-4 w-full bg-white pt-5 px-8 rounded-t-3xl min-h-screen">
      <h1 class="text-blue-500 mb-3 text-center">daftar penyakit yang sesuai dengan keluhan yang dirasakan</h1>
      <div class="py-3 my-5 space-y-3">
        <div v-if="loading.getKeluhan" class="flex flex-col justify-center items-center mt-14">
          <Spinner></Spinner>
        </div>
        <div v-else-if="penyakitData.length != 0" class="space-y-5">
          <div v-for="penyakit in penyakitData" :key="penyakit.id" class="border border-yellow-500 rounded-xl shadow-lg text-blue-900">
            <div class="px-5 mt-3">
              <h2 class="text-xl mb-2 font-bold">{{penyakit.nama}}</h2>
              <p>{{penyakit.deskripsi}}</p>
            </div>
            <button @click="toDetailPenyakit(penyakit.id)" class="mt-5 py-2 w-full bg-yellow-200 rounded-b-xl">lihat info penyakit</button>
          </div>
        </div>
        <div v-else class="flex flex-col justify-center items-center">
          <img src="@/assets/nodata.svg" alt="no data" class="w-full h-32 mb-5">
          <p class="text-lg text-gray-400">No Data</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, onMounted, computed} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import Spinner from '../components/Spinner.vue'
export default {
  components: {Spinner},
  setup(){
    const store = useStore()
    const router = useRouter()

    const loading = ref({
      getPenyakit: false
    })

    const penyakitData = computed(() => store.state.user.penyakit)

    const toDetailPenyakit = (id) => {
      router.push({path: '/penyakit/detail', query: {id}})
    }

    onMounted(() => {
      loading.value.getPenyakit = true
      store.dispatch('user/getPenyakit')
      .then(() => {loading.value.getPenyakit = false})
    })

    return {
      loading,
      penyakitData,
      toDetailPenyakit
    }
  }
}
</script>