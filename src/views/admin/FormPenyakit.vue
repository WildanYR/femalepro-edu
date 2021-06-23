<template>
  <div class="mb-20 mx-6">
    <button @click="$router.go(-1)" class="flex justify-start items-center mt-6 mb-1 text-gray-500">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
      </svg>
      <p class="ml-1 font-semibold transform-t">kembali</p>
    </button>

    <h1 class="mb-6 text-xl font-semibold">{{$route.query.form=='tambah'?'Tambah':'Ubah'}} Penyakit</h1>

    <div class="space-y-3 mb-5">
      <InputText v-model="addPenyakitData.nama" label="nama penyakit" :nodata="validate.addPenyakit.nama"></InputText>
      <InputTextArea v-model="addPenyakitData.deskripsi" label="deskripsi" :nodata="validate.addPenyakit.deskripsi"></InputTextArea>
      <InputTextArea v-model="addPenyakitData.diagnosa" label="diagnosa" :nodata="validate.addPenyakit.diagnosa"></InputTextArea>
      <InputTextArea v-model="addPenyakitData.saran_pengobatan" label="saran_pengobatan" :nodata="validate.addPenyakit.saran_pengobatan"></InputTextArea>
      <div>
        <p class="mb-1 text-sm text-gray-400">keluhan</p>
        <button @click="modalOpen.keluhan = true" class="w-full py-2 font-medium rounded-md bg-green-100 text-green-500 active:bg-green-500 active:text-white">cari keluhan</button>
        <ul v-if="addPenyakitData.keluhan.length != 0">
          <li v-for="(keluhan, idx) in addPenyakitData.keluhan" :key="idx">{{keluhan}}</li>
        </ul>
        <p v-show="validate.addPenyakit.keluhan" class="mb-1 text-sm text-red-500">data perlu diisi</p>
      </div>
    </div>

    <button @click="handleAction" class="w-full py-2 font-medium rounded-md bg-blue-100 text-blue-500 active:bg-blue-500 active:text-white">{{$route.query.form=='tambah'?'Tambah':'Ubah'}}</button>

  </div>
  <!-- modal keluhan -->
  <Modal :openModal="modalOpen.keluhan">
    <h2 class="text-lg text-center text-blue-500 font-semibold mb-3">Keluhan</h2>
    <div class="flex items-center">
      <div class="flex justify-between items-center px-2 py-1 text-md text-black bg-white border border-gray-400 rounded focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 focus-within:bg-blue-50">
        <input v-model="cariKeluhan" type="text" placeholder="cari keluhan" class="bg-transparent">
        <button @click="cariKeluhan = ''" class="active:bg-gray-300 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <button @click="modalOpen.add_keluhan = true" class="p-2 font-medium rounded-md bg-green-100 text-green-500 active:bg-green-500 active:text-white ml-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
    <div class="py-3 my-5 space-y-3 disable-scrollbar max-h-72 overflow-y-scroll">
      <div v-if="loadKeluhan" class="flex flex-col justify-center items-center mt-14">
        <Spinner></Spinner>
      </div>
      <div v-else-if="keluhanData.length != 0" class="space-y-3">
        <div v-for="keluhan in keluhanData" :key="keluhan.id" class="flex justify-center items-center">
          <button @click="selectKeluhan(keluhan.id)" :class="[keluhan.selected?'bg-blue-500 text-white':'bg-blue-50']" class="flex justify-start items-center w-full px-3 py-1 font-medium border border-blue-500 rounded-md">
            {{keluhan.text}}
          </button>
          <button @click="openDelKeluhanModal(keluhan.id)" class="p-2 ml-2 bg-red-100 text-red-500 rounded-md active:bg-red-500 active:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      <div v-else class="flex flex-col justify-center items-center">
        <img src="@/assets/nodata.svg" alt="no data" class="w-full h-32 mb-5">
        <p class="text-lg text-gray-400">No Data</p>
      </div>
    </div>
    <div class="flex justify-center items-center space-x-2">
      <button @click="closeKeluhanModal" class="w-full py-2 font-medium rounded-md bg-red-100 text-red-500 active:bg-red-500 active:text-white">Keluar</button>
      <button @click="applyKeluhan" class="w-full py-2 font-medium rounded-md bg-blue-100 text-blue-500 active:bg-blue-500 active:text-white">Tambah</button>
    </div>
  </Modal>
  <!-- modal tambah keluhan -->
  <Modal :openModal="modalOpen.add_keluhan">
    <h2 class="text-lg text-center text-blue-500 font-semibold mb-3">Tambah Keluhan</h2>
    <div class="space-y-3 mb-5">
      <InputText label="keluhan" v-model="addKeluhanData"></InputText>
    </div>
    <div class="flex justify-center items-center space-x-2">
      <button @click="closeAddKeluhanModal" class="w-full py-2 font-medium rounded-md bg-red-100 text-red-500 active:bg-red-500 active:text-white">Keluar</button>
      <button @click="addKeluhan" class="w-full py-2 font-medium rounded-md bg-blue-100 text-blue-500 active:bg-blue-500 active:text-white">Tambah</button>
    </div>
  </Modal>
  <!-- modal hapus keluhan -->
  <Modal :openModal="modalOpen.del_keluhan">
    <h2 class="text-lg text-center text-red-500 font-semibold mb-3">Hapus Keluhan</h2>
    <p class="mb-5 text-sm text-gray-500">data yang terhapus tidak dapat dikembalikan lagi!!!</p>
    <div class="flex justify-center items-center space-x-2">
      <button @click="deleteKeluhan" class="w-full py-2 font-medium rounded-md bg-red-100 text-red-500 active:bg-red-500 active:text-white">Hapus</button>
      <button @click="closeDelKeluhanModal()" class="w-full py-2 font-medium rounded-md bg-green-100 text-green-500 active:bg-green-500 active:text-white">Jangan</button>
    </div>
  </Modal>
  <LoadingScreen :openLoading="loadingScreen"></LoadingScreen>

</template>

<script>
import {ref, computed, onMounted} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useStore} from 'vuex'
import InputText from '../../components/InputText.vue'
import InputTextArea from '../../components/InputTextArea.vue'
import Modal from '../../components/Modal.vue'
import Spinner from '../../components/Spinner.vue'
import LoadingScreen from '../../components/LoadingScreen.vue'

export default {
  components: {InputText, InputTextArea, Modal, Spinner, LoadingScreen},
  setup(){
    
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const addPenyakitData = ref({
      nama: '',
      deskripsi: '',
      diagnosa: '',
      keluhan: [],
      saran_pengobatan: ''
    })
    
    const addKeluhanData = ref('')
    const selectedDelKeluhan = ref('')
    const cariKeluhan = ref('')
    const modalOpen = ref({
      keluhan: false,
      add_keluhan: false,
      del_keluhan: false
    })
    const loadingScreen = ref(false)
    const loadKeluhan = ref(false)

    const keluhanData = computed(() => {
      if(store.state.admin.keluhan.length == 0) return []
      if(!cariKeluhan.value){
        const selectedKeluhan = store.state.admin.keluhan.filter(item => item.selected)
        const listKeluhan = store.state.admin.keluhan.filter(item => !item.selected)
        listKeluhan.unshift(...selectedKeluhan)
        return listKeluhan
      }
      const keluhanList = store.state.admin.keluhan.filter(item => item.text.includes(cariKeluhan.value))
      return keluhanList
    })

    const validate = ref({
      addPenyakit: {
        nama: false,
        deskripsi: false,
        diagnosa: false,
        keluhan: false,
        saran_pengobatan: false
      }
    })

    const clearState = () => {
      addPenyakitData.value.nama = ''
      addPenyakitData.value.deskripsi = ''
      addPenyakitData.value.diagnosa = ''
      addPenyakitData.value.keluhan = []
      validate.value.addPenyakit.nama = false
      validate.value.addPenyakit.deskripsi = false
      validate.value.addPenyakit.diagnosa = false
      validate.value.addPenyakit.keluhan = false
    }
    const handleAction = () => {
      if(!(addPenyakitData.value.nama || addPenyakitData.value.deskripsi || addPenyakitData.value.diagnosa || addPenyakitData.value.saran_pengobatan) || addPenyakitData.value.keluhan.length == 0){
        if(!addPenyakitData.value.nama) validate.value.addPenyakit.nama = true
        if(!addPenyakitData.value.deskripsi) validate.value.addPenyakit.deskripsi = true
        if(!addPenyakitData.value.diagnosa) validate.value.addPenyakit.diagnosa = true
        if(!addPenyakitData.value.saran_pengobatan) validate.value.addPenyakit.saran_pengobatan = true
        if(addPenyakitData.value.keluhan == 0) validate.value.addPenyakit.keluhan = true
      }else{
        loadingScreen.value = true
        if(route.query.form == 'tambah'){
          store.dispatch('admin/addPenyakit', addPenyakitData.value)
          .then(() => {
            clearState()
            router.go(-1)
          })
        }else{
          const id = route.query.id
          store.dispatch('admin/updatePenyakit', {id, data:addPenyakitData.value})
          .then(() => {
            clearState()
            router.go(-1)
          })
        }
        loadingScreen.value = false
      }
    }

    const openDelKeluhanModal = (id) => {
      modalOpen.value.del_keluhan = true
      selectedDelKeluhan.value = id
    }

    const closeKeluhanModal = () => {
      modalOpen.value.keluhan = false
      cariKeluhan.value = ''
      store.commit('admin/removeSelectedKeluhan')
    }

    const closeAddKeluhanModal = () => {
      modalOpen.value.add_keluhan = false
      addKeluhanData.value = ''
    }

    const closeDelKeluhanModal = () => {
      modalOpen.value.del_keluhan = false
      selectedDelKeluhan.value = ''
    }

    const addKeluhan = () => {
      store.dispatch('admin/addKeluhan', {text: addKeluhanData.value})
      closeAddKeluhanModal()
    }
    
    const deleteKeluhan = () => {
      store.dispatch('admin/deleteKeluhan', selectedDelKeluhan.value)
      closeDelKeluhanModal()
    }

    const selectKeluhan = (id) => {
      store.commit('admin/selectKeluhan', id)
    }

    const applyKeluhan = () => {
      addPenyakitData.value.keluhan = store.state.admin.keluhan.filter(item => item.selected)
      .map(item => item.text)
      closeKeluhanModal()
    }

    onMounted(() => {
      loadKeluhan.value = true
      store.dispatch('admin/getKeluhan').then(() => {loadKeluhan.value = false})
      if(route.query.form != 'tambah'){
        addPenyakitData.value = store.state.admin.penyakit.filter(item => item.id == route.query.id)[0]
      }
    })

    return {
      addPenyakitData,
      validate,
      addKeluhanData,
      keluhanData,
      cariKeluhan,
      loadKeluhan,
      handleAction,
      addKeluhan,
      selectKeluhan,
      closeKeluhanModal,
      applyKeluhan,
      closeAddKeluhanModal,
      selectedDelKeluhan,
      deleteKeluhan,
      openDelKeluhanModal,
      closeDelKeluhanModal,
      modalOpen,
      loadingScreen
    }
  }
}
</script>

<style>
  .transform-t {
    transform: translateY(-0.100rem);
  }
</style>