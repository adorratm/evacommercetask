<template>
  <ClientOnly>
    <div class="drawer-side z-50">
      <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 min-h-full bg-base-300 text-base-content">
        <!-- Sidebar content here -->
        <li>
          <NuxtLink to="/" title="Home"><Icon name="mdi:home" size="2em" />Home</NuxtLink>
        </li>
        <li v-if="!user?.email">
          <NuxtLink to="/login" title="Login"
            ><Icon name="mdi:login" size="2em" />Login</NuxtLink
          >
        </li>
        <li v-else>
          <NuxtLink to="/dashboard" title="Dashboard"
            ><Icon name="mdi:view-dashboard" size="2em" />Dashboard</NuxtLink
          >
        </li>
      </ul>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useUserStore, type User } from '~/store/user';
  const store = useUserStore();
  const user = ref<User>(store.user) ;
  watch(() => store.user, (value) => {
      user.value = value;
  })
</script>
