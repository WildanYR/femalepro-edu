<template>
  <teleport to="body">
    <transition name="alert-slide">
      <div v-if="alert" class="fixed top-0 right-0">
        <div class="disable-scrollbars w-full md:max-w-screen-sm md:mx-auto max-h-screen p-3">
          <div class="bg-white flex items-start p-4 rounded-lg border shadow-md">
            <div class="mr-5">
              <h3 class="text-lg font-medium text-red-500">Error</h3>
              <p class="text-gray-500">{{message}}</p>
            </div>
            <button @click="$emit('alertClose')" class="p-1 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: {
    alert: Boolean,
    message: String
  },
  emits: ['alertClose']
}
</script>