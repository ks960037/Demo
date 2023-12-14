<template>
  <aside
    id="sidenav-main"
    class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl d-none d-xl-block my-3"
    :class="`fixed-start ms-3 ${navStore.sidenavType}`"
  >
    <div class="sidenav-header" style="position: relative">
      <NuxtLink class="m-0 navbar-brand" to="/dashboard">
        <img :src="logo" class="navbar-brand-img mb-2" alt="網站圖標" />
        <span
          class="ms-2 font-weight-bold h5"
          :class="navStore.sidenavType === 'bg-default bg-transparent' && 'text-white'"
          >簡訊發送平台</span
        >
      </NuxtLink>
    </div>
    <hr class="mt-0 horizontal dark" />
    <!-- 側欄選項 -->
    <SidenavList />
  </aside>
</template>

<script setup>
import SidenavList from "./SidenavList.vue";
import logo from "@/assets/img/favicon.png";
import { useNavStore } from "~~/stores/NavStore";
const navStore = useNavStore();
</script>
<style scoped>
.router-link-active {
  color: "#212529";
}
</style>
