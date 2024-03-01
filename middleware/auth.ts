import { useUserStore } from "~/store/user";

const store = useUserStore()

export default defineNuxtRouteMiddleware((to, from) => {
    if (!store.isLogin) {
        return navigateTo('/login')
    }
});