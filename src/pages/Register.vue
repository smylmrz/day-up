<script setup lang="ts">
import { reactive } from "vue";
import { supabaseClient } from "../supabaseClient.ts";
import { router } from "../router.ts";

const signIn = async () => {
  const { data, error } = await supabaseClient.auth.signUp({
    email: form.email,
    password: form.password,
  })

  if (data) {
    await router.push("/login")
  }
}

const form = reactive({
  email: "",
  password: "",
});
</script>

<template>
  <div class="w-1/3 mx-auto pt-20 space-y-10">
    <h3 class="text-xl text-white font-bold">
      Sign up
    </h3>
    <form @submit.prevent="signIn" class="flex flex-col gap-4">
      <input placeholder="email" class="w-full py-2 pl-3 rounded-md" type="email" v-model="form.email">
      <input placeholder="password" class="w-full py-2 pl-3 rounded-md" type="password" v-model="form.password">
      <button class="max-w-fit rounded-full px-5 py-2 bg-white text-black hover:bg-neutral-200 font-medium text-sm">
        Sign up
      </button>

      <RouterLink to="/login">
        Login instead
      </RouterLink>
    </form>
  </div>
</template>
