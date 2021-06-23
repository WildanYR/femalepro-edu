<template>
  <div class="relative safe-top safe-left safe-right safe-bottom md:border-l md:border-r md:border-gray-300 md:max-w-screen-sm md:mx-auto">
    <div class="disable-scrollbars max-h-screen h-screen overflow-y-scroll overflow-x-hidden">
      <router-view />
    </div>
  </div>
  <Alert :message="alertMessage" :alert="alertOpen" @alertClose="closeAlert"></Alert>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
import Alert from './components/Alert.vue'
export default {
  components: {Alert},
  setup(){
    const store = useStore()
    const alertOpen = computed(() => store.state.errorAlert)
    const alertMessage = computed(() => store.state.errorMessage)

    const closeAlert = () => {
      store.commit('closeAlert')
    }
    return {
      alertOpen,
      alertMessage,
      closeAlert
    }
  }
}
</script>