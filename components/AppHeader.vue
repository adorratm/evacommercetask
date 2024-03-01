<template>
  <ClientOnly>
    <div class="navbar bg-base-300 sticky top-0 z-50">
      <div class="flex-none">
        <label class="btn btn-square btn-ghost drawer-button" for="my-drawer">
          <Icon name="gg:menu" size="2em" />
        </label>
      </div>
      <div class="flex-1">
        <NuxtLink
          to="/"
          title="Eva Commerce Job Application Task"
          class="btn btn-ghost sm:text-sm md:text-base lg:text-lg w-fit"
          >Eva Commerce Job Application Task</NuxtLink
        >
      </div>

      <div class="flex justify-end px-2">
        <details class="dropdown dropdown-end">
          <summary class="btn btn-square btn-ghost">
            <NuxtImg
              loading="lazy"
              src="https://avatars.githubusercontent.com/u/39022587?v=4"
              alt="Emre KILIÇ"
              width="25"
              height="25"
              class="rounded-full"
            />
          </summary>
          <ul
            class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box p-auto"
          >
            <li class="text-center align-middle flex-1 justify-center">
              <NuxtLink
                to="mailto:emrekilic19983@gmail.com"
                title="Emre KILIÇ"
                class="flex flex-col gap-0"
              >
                <span class="text-nowrap">Emre KILIÇ</span>
                <span class="divider m-0"></span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="https://linkedin.com/in/emrekilic98"
                title="Emre KILIÇ Linkedin"
                target="_blank"
              >
                <Icon name="mdi:linkedin" class="text-[#0a66c2]" size="1.5em" />
                Linkedin
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="https://github.com/adorratm"
                title="Emre KILIÇ Github"
                target="_blank"
              >
                <Icon name="mdi:github" size="1.5em" />
                Github
              </NuxtLink>
            </li>
          </ul>
        </details>
      </div>
      <div class="flex justify-end px-2" v-if="user?.email">
        <details class="dropdown dropdown-end">
          <summary class="btn btn-square btn-ghost">
            <Icon name="mdi:account-circle" size="2em" />
          </summary>
          <ul
            class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box p-auto"
          >
            <li class="text-center align-middle flex-1 justify-center">
              <NuxtLink
                :to="'mailto:' + user.email"
                :title="user.firstName + ' ' + user.firstName"
                class="flex flex-col gap-0"
              >
                <span class="text-nowrap">{{ user.firstName }} {{ user.lastName }}</span>
                <span class="divider m-0"></span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/" title="Logout" @click="logout">
                <Icon name="mdi:logout" size="1.5em" />
                Logout
              </NuxtLink>
            </li>
          </ul>
        </details>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useUserStore, type User } from '~/store/user';
    const store = useUserStore();
    const user = ref<User>(store.user) ;
    watch(() => store.user, (value) => {
        user.value = value;
    });

    const logout = () => {
        store.logout();
        navigateTo('/login');
    };
</script>
