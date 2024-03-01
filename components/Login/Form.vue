import type loginVue from '~/layouts/login.vue';
<template>
  <form class="space-y-4" @submit.prevent="login">
    <div>
      <label class="label">
        <span class="text-base label-text">Email</span>
      </label>
      <input
        type="text"
        placeholder="Email Address"
        class="w-full input input-bordered"
        v-model="email"
      />
    </div>
    <div>
      <label class="label">
        <span class="text-base label-text">Password</span>
      </label>
      <input
        type="password"
        placeholder="Enter Password"
        class="w-full input input-bordered"
        v-model="password"
      />
    </div>
    <div>
      <button class="btn btn-block">Login</button>
    </div>
  </form>
</template>
<script setup lang="ts">;
import { useUserStore } from "~/store/user";
const { $toast } = useNuxtApp();
const store = useUserStore();
const config = useRuntimeConfig();

const email = ref("");
const password = ref("");

interface LoginResponse {
  AccessToken: string;
  RefreshToken: string;
}

interface ApiResponse<T> {
  ApiStatus: boolean;
  Data: T;
  Message: string;
}

const login = async () => {
  const data = await $fetch("oauth/token", {
    method: "POST",
    baseURL: config.public.API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Email: email.value,
      Password: password.value,
      GrantType: config.public.GRANT_TYPE,
      Scope: config.public.SCOPE,
      ClientId: config.public.CLIENT_ID,
      ClientSecret: config.public.CLIENT_SECRET,
      RedirectUri: config.public.REDIRECT_URI,
    }),
  });
  const response = data as ApiResponse<LoginResponse>;
  console.log(response);
  if (response.ApiStatus) {
    store.loggedInEmail = email.value;
    store.AccessToken = response.Data.AccessToken;
    store.RefreshToken = response.Data.RefreshToken;
    const loginInfo = await store.login();
    if(loginInfo.ApiStatus){
        navigateTo('/dashboard');
        console.log(store.user)
        useNuxtApp().$toast.success("Login Successfully!");
    }
    
  }
};
</script>
