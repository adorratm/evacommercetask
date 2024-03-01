<template>
  <div class="relative flex flex-col justify-center h-screen overflow-hidden">
    <div
      class="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg"
    >
      <h1 class="text-3xl font-semibold text-center text-gray-700">Login</h1>
      <LoginForm />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "login",
  middleware: 'unauthenticated'
});
</script>
