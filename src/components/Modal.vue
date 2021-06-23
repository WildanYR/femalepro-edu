<template>
  <teleport to="body">
    <div>
      <!-- overlay -->
      <transition name="modal-fade">
        <div v-if="openModal" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>
      </transition>
      <!-- card -->
      <transition name="blow-up">
        <div v-if="openModal" class="fixed top-0 left-0 w-full h-full flex justify-center items-center">
          <div class="disable-scrollbars w-full md:max-w-screen-sm md:mx-auto max-h-screen px-6 py-8 overflow-y-scroll">
            <div class="w-full bg-white px-4 pt-3 pb-6 rounded-md">
              <slot></slot>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script>
export default {
  props: {
    openModal: Boolean
  }
}
</script>