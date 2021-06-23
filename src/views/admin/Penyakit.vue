<template>
  <!-- Header -->
  <div class="mt-6">
    <img src="@/assets/medicine.svg" alt="doctor medicine" class="w-full h-44">
    <div class="flex justify-between items-center mt-6">
      <h2 class="text-2xl font-semibold text-blue-500">Daftar Penyakit</h2>
      <button @click="$router.push({path: '/admin/penyakit/form', query: {form: 'tambah'}})" class="flex justify-center items-center py-1 px-3 bg-blue-500 text-white rounded active:bg-blue-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <p class="ml-1 text-sm">Tambah</p>
      </button>
    </div>
  </div>

  <!-- Penyakit list -->
  <div v-if="loadPenyakit" class="flex flex-col justify-center items-center mt-14">
    <Spinner></Spinner>
  </div>
  <div v-else-if="penyakitData.length != 0" class="flex flex-col justify-center items-center mt-4 space-y-3">
    <button v-for="penyakit in penyakitData" :key="penyakit.id" @click="openDetailModal(penyakit.id)" class="flex justify-start items-center w-full px-3 py-3 bg-opacity-20 bg-blue-100 border border-blue-500 rounded-md active:bg-blue-500 active:text-white">
      <h3 class="text-lg font-medium">{{penyakit.nama}}</h3>
    </button>
  </div>
  <div v-else class="flex flex-col justify-center items-center mt-14">
    <img src="@/assets/nodata.svg" alt="no data" class="w-full h-32 mb-5">
    <p class="text-lg text-gray-400">No Data</p>
  </div>
  
  <!-- Modal detail -->
  <Modal :openModal="detailModalOpen">
    <h2 class="text-lg text-center text-blue-500 font-semibold mb-6">Detail Penyakit</h2>
    <div class="space-y-5 mb-6 break-words">
      <p class="text-xl font-medium">{{filterPenyakit.nama}}</p>
      <div>
        <p class="font-medium mb-1 text-blue-500">penjelasan</p>
        <p>{{filterPenyakit.deskripsi}}</p>
      </div>
      <div>
        <p class="font-medium mb-1 text-blue-500">diagnosa</p>
        <p>{{filterPenyakit.diagnosa}}</p>
      </div>
      <div>
        <p class="font-medium mb-1 text-blue-500">keluhan</p>
        <ul>
          <li v-for="(keluhan, idx) in filterPenyakit.keluhan" :key="idx">{{keluhan}}</li>
        </ul>
      </div>
    </div>
    <div class="flex justify-center items-center space-x-2">
      <button @click="resetModal" class="w-full py-2 font-medium rounded-md bg-blue-100 text-blue-500 active:bg-blue-500 active:text-white">Keluar</button>
      <button @click="modalHapusOpen = true" class="relative w-full py-2 font-medium rounded-md bg-red-100 text-red-500 active:bg-red-500 active:text-white">Hapus</button>
      <button @click="$router.push({path: '/admin/penyakit/form', query: {form: 'ubah', id: filterPenyakit.id}})" class="w-full py-2 font-medium rounded-md bg-yellow-100 text-yellow-500 active:bg-yellow-500 active:text-white">Edit</button>
    </div>
  </Modal>

  <!-- modal hapus -->
  <Modal :openModal="modalHapusOpen">
    <h2 class="text-lg text-center text-red-500 font-semibold mb-3">Hapus Penyakit</h2>
    <p class="mb-5 text-sm text-gray-500">data yang terhapus tidak dapat dikembalikan lagi!!!</p>
    <div class="flex justify-center items-center space-x-2">
      <button @click="deleteAction" class="w-full py-2 font-medium rounded-md bg-red-100 text-red-500 active:bg-red-500 active:text-white">Hapus</button>
      <button @click="modalHapusOpen = false" class="w-full py-2 font-medium rounded-md bg-green-100 text-green-500 active:bg-green-500 active:text-white">Jangan</button>
    </div>
  </Modal>

</template>

<script>
import {ref, computed, onMounted} from 'vue'
import {useStore} from 'vuex'
import Modal from '../../components/Modal.vue'
import Spinner from '../../components/Spinner.vue'
export default {
  components: {Modal, Spinner},
  setup(){
    const store = useStore()

    const detailModalOpen = ref(false)
    const modalHapusOpen = ref(false)
    const penyakitData = computed(() => store.state.admin.penyakit)
    const selectedPenyakitId = ref(0)
    const loadPenyakit = ref(false)
    
    const filterPenyakit = computed(() => store.state.admin.penyakit.find(item => item.id == selectedPenyakitId.value))

    const openDetailModal = (id) => {
      selectedPenyakitId.value = id
      detailModalOpen.value = true
    }

    const resetModal = () => {
      detailModalOpen.value = false
      modalHapusOpen.value = false
      selectedPenyakitId.value = 0
    }

    const deleteAction = () => {
      modalHapusOpen.value = false
      detailModalOpen.value = false
      loadPenyakit.value = true
      store.dispatch('admin/deletePenyakit', selectedPenyakitId.value)
      .then(() => {
        loadPenyakit.value = false
        selectedPenyakitId.value = 0
      })
    }

    onMounted(() => {
      loadPenyakit.value = true
      store.dispatch('admin/getPenyakit').then(() => {loadPenyakit.value = false})
    })

    return {
      detailModalOpen,
      modalHapusOpen,
      penyakitData,
      selectedPenyakitId,
      loadPenyakit,
      filterPenyakit,
      openDetailModal,
      resetModal,
      deleteAction
    }
  }
}
</script>