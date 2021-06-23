<template>
  <div class="text-gray-400 focus-within:text-blue-500 focus-within:font-medium">
    <p class="mb-1 text-sm">{{label}}</p>
    <textarea :rows="rows || 4" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" class="block w-full px-2 py-1 text-md text-blackborder rounded border" :class="[nodata?'bg-red-50 border-red-500 focus:ring-red-500 focus:border-red-500 focus:bg-red-50':'bg-white border-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:bg-blue-50']"></textarea>
    <p v-show="nodata" class="mb-1 text-sm text-red-500">data perlu diisi</p>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    label: String,
    rows: Number,
    nodata: Boolean
  }
}
</script>