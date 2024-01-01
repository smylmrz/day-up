<script setup lang="ts">
const weekDays = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun"
]
</script>

<template>
  <div class="flex justify-center gap-2">
    <div v-for="day in weekDays" :key="day"
         class="text-center bg-neutral-700 w-20 py-2 rounded-md"
    >
      {{ day }}
    </div>
  </div>
</template>

<style scoped>

</style>