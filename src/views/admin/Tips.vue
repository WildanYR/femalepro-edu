<template>
  <!-- Header -->
  <div class="mt-6">
    <img src="@/assets/bulb-pro.svg" alt="tips vector" class="w-full h-48">
    <div class="flex justify-between items-center mt-6">
      <h2 class="text-2xl font-semibold text-blue-500">Daftar Tips</h2>
      <button @click="modalTambahOpen = true" class="flex justify-center items-center py-1 px-3 bg-blue-500 text-white rounded active:bg-blue-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <p class="ml-1 text-sm">Tambah</p>
      </button>
    </div>
  </div>

  <!-- Tips list -->
  <div v-if="loadTips" class="flex flex-col justify-center items-center mt-14">
    <Spinner></Spinner>
  </div>
  <div v-else-if="tipsData.length != 0" class="flex flex-col justify-center items-center mt-4 space-y-3">
    <div v-for="tips in tipsData" :key="tips.id" class="px-3 p-2 border border-blue-400 w-full rounded-md">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-xl font-medium">{{tips.tips}}</h3>
        <button @click="openDeleteModal(tips.id)" class="p-2 ml-2 bg-red-100 text-red-500 rounded-md active:bg-red-500 active:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      <p class="text-md max-w-prose">{{tips.penjelasan}}</p>
    </div>
  </div>
  <div v-else class="flex flex-col justify-center items-center mt-14">
    <img src="@/assets/nodata.svg" alt="no data" class="w-full h-32 mb-5">
    <p class="text-lg text-gray-400">No Data</p>
  </div>

  <!-- Modal tambah -->
  <Modal :openModal="modalTambahOpen">
    <h2 class="text-lg font-semibold mb-3">Tambah Tips</h2>
    <div class="space-y-3 mb-5">
      <InputTextArea label="tips" :nodata="validate.addTips.tips" v-model="tipsAddData.tips"></InputTextArea>
    </div>
    <div class="flex justify-center items-center space-x-2">
      <button @click="resetModal" class="w-full py-2 font-medium rounded-md bg-red-100 text-red-500 active:bg-red-500 active:text-white">Keluar</button>
      <button @click="addTips" class="w-full py-2 font-medium rounded-md bg-blue-100 text-blue-500 active:bg-blue-500 active:text-white">Tambah</button>
    </div>
  </Modal>

  <!-- modal hapus -->
  <Modal :openModal="modalHapusOpen">
    <h2 class="text-lg text-center text-red-500 font-semibold mb-3">Hapus Tips</h2>
    <p class="mb-5 text-sm text-gray-500">data yang terhapus tidak dapat dikembalikan lagi!!!</p>
    <div class="flex justify-center items-center space-x-2">
      <button @click="deleteTips" class="w-full py-2 font-medium rounded-md bg-red-100 text-red-500 active:bg-red-500 active:text-white">Hapus</button>
      <button @click="resetModal" class="w-full py-2 font-medium rounded-md bg-green-100 text-green-500 active:bg-green-500 active:text-white">Jangan</button>
    </div>
  </Modal>
</template>

<script>
import {ref, onMounted, computed} from 'vue'
import {useStore} from 'vuex'
import InputText from '../../components/InputText.vue'
import InputTextArea from '../../components/InputTextArea.vue'
import Modal from '../../components/Modal.vue'
import Spinner from '../../components/Spinner.vue'
export default {
  components: {InputText, InputTextArea, Modal, Spinner},
  setup(){
    const store = useStore()

    const modalTambahOpen = ref(false)
    const modalHapusOpen = ref(false)
    const tipsAddData = ref({
      tips: ''
    })
    const tipsData = computed(() => store.state.admin.tips)
    const selectedTipsId = ref(0)
    const loadTips = ref(false)
    const validate = ref({
      addTips: {tips: false}
    })

    const addTips = () => {
      if(tipsAddData.value.tips){
        modalTambahOpen.value = false
        loadTips.value = true
        store.dispatch('admin/addTips', tipsAddData.value)
        .then(() => {
          loadTips.value = false
          tipsAddData.value.tips = ''
          tipsAddData.value.penjelasan = ''
        })
      }else{
        validate.value.addTips.tips = true
      }
    }

    const openDeleteModal = (id) => {
      selectedTipsId.value = id
      modalHapusOpen.value = true
    }

    const deleteTips = () => {
      modalHapusOpen.value = false
      loadTips.value = true
      store.dispatch('admin/deleteTips', selectedTipsId.value)
      .then(() => {loadTips.value = false})
    }

    const resetModal = () => {
      modalTambahOpen.value = false
      modalHapusOpen.value = false
      selectedTipsId.value = 0
      tipsAddData.value.tips = ''
      tipsAddData.value.penjelasan = ''
      validate.value.addTips.tips = false
    }

    onMounted(() => {
      loadTips.value = true
      store.dispatch('admin/getTips').then(() => {loadTips.value = false})
    })

    return {
      modalTambahOpen,
      modalHapusOpen,
      tipsAddData,
      tipsData,
      selectedTipsId,
      loadTips,
      validate,
      addTips,
      openDeleteModal,
      deleteTips,
      resetModal
    }
  }
}
</script>