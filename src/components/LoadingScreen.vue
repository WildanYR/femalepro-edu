<template>
  <teleport to="body">
    <div>
      <!-- overlay -->
      <transition name="modal-fade">
        <div v-if="openLoading" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>
      </transition>
      <!-- card -->
      <transition name="blow-up">
        <div v-if="openLoading" class="fixed top-0 left-0 w-full h-full flex justify-center items-center">
          <div class="disable-scrollbars w-full md:max-w-screen-sm md:mx-auto max-h-screen px-6 py-8 overflow-y-scroll">
            <Spinner></Spinner>
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script>
import Spinner from './Spinner.vue'
export default {
  props: {
    openLoading: Boolean
  },
  components: {Spinner}
}
</script>