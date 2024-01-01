<script setup lang="ts">
import { ref } from "vue";
import { useStreak } from "../hooks/useStreak.ts";

const { createStreak } = useStreak()

const title = ref("")

const save = async () => {
  await createStreak(title.value)
}
</script>

<template>
  <div class="w-1/3 mx-auto">
    <form class="flex items-center flex-col gap-4" @submit.prevent="save">
      <input class="w-full py-2 pl-3 rounded-md" type="text" v-model="title">
      <button class="max-w-fit rounded-full px-5 py-2 bg-white text-black hover:bg-neutral-200 font-medium text-sm">
        Start a new streak
      </button>
    </form>
  </div>
</template>
