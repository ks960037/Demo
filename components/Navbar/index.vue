<template>
  <nav
    id="navbarBlur"
    :class="
      navStore.navFixed
        ? `navbar navbar-main navbar-expand-lg px-0 mx-4 border-radius-xl shadow-none position-sticky left-auto top-2 z-index-sticky ${
            navStore.darkMode ? 'bg-default' : 'bg-white'
          }`
        : `navbar navbar-main navbar-expand-lg px-0 mx-4 border-radius-xl shadow-none`
    "
    v-bind="$attrs"
    data-scroll="true"
  >
    <div class="px-3 py-1 container-fluid">
      <Breadcrumbs />
      <div id="navbar" class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4">
        <div class="pe-md-3 d-flex align-items-center ms-md-auto">
          <div class="input-group"></div>
        </div>
        <ul class="navbar-nav justify-content-end">
          <li
            class="nav-item d-flex align-items-center px-0 nav-link font-weight-bold"
            :class="
              navStore.navFixed && !navStore.darkMode
                ? 'opacity-8 text-dark'
                : 'text-white'
            "
          >
            <span class="d-sm-inline d-none">早安，</span>
            <span class="d-sm-inline d-none" v-text="userName"></span>
            <i class="fas fa-user me-sm-1 mx-2"></i>
            <ArgonButton
              color="success"
              size="sm"
              variant=""
              class="p-2 ms-1"
              @click="checkCredit"
              >點數：{{ credit }}</ArgonButton
            >
            <ArgonButton
              color="danger"
              size="sm"
              variant="gradient"
              class="p-2 ms-1"
              @click="onLogoutClick"
              >登出</ArgonButton
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup>
import Breadcrumbs from "../Breadcrumbs";
import { useNavStore } from "~~/stores/NavStore";
const navStore = useNavStore();

const user = useAuthUser();
const userName = user.value.name;

const credit = useCredits();
async function checkCredit() {
  const result = await useFetchWithToken("/api/credit", {
    method: "GET",
  });

  console.log("checkCredit", result);
  credit.value = result;
}

onBeforeMount(() => {
  checkCredit();
});
const { logout } = useAuth();
async function onLogoutClick() {
  await logout();
  return await navigateTo("/");
}
</script>
