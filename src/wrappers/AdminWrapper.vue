<template>
  <!-- Main -->
  <div class="mb-20 mx-6">
    <router-view />
  </div>

  <!-- NavBar -->
  <div class="absolute left-0 bottom-0 flex justify-between items-center w-full border-t border-gray-300 bg-white">
    <button @click="$router.push('/admin/tips')" class="flex flex-col justify-center items-center w-full py-3 active:bg-blue-100" :class="[$route.path=='/admin/tips'?'text-blue-400 font-semibold border-t-2 border-blue-500':'text-gray-500']" :disabled="$route.path=='/admin/tips'">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
      <p class="text-sm">Tips</p>
    </button>
    <button @click="$router.push('/admin/penyakit')" class="flex flex-col justify-center items-center w-full py-3 active:bg-blue-100" :class="[$route.path!='/admin/tips'?'text-blue-400 font-semibold border-t-2 border-blue-500':'text-gray-500']" :disabled="$route.path=='/admin/penyakit'">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-sm">Penyakit</p>
    </button>
  </div>
</template>