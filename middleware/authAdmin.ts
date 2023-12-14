import { useAuthUser } from "~/composables/states.js"
export default defineNuxtRouteMiddleware((to, from) => {
    const user = useAuthUser();
    console.log("(中間件)確認是否有管理權", user.value);

    const isUserLogin = user.value != null;
    const isAdmin = user?.value?.name == "admin";

    if (isUserLogin && !isAdmin) return navigateTo("/dashboard")
    if (!isUserLogin) return navigateTo("/adminlogin")
})
