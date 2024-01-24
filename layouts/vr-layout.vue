<template>
  <div id="app-layout" :class="isCollapsed && 'g-sidenav-hidden'">
    <div class="mt-4">
      <Navbar class="bg-success" />
    </div>
    <div class="mx-3 mt-3 border-radius-xl position-relative" :style="{
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
    }">
      <Sidenav />

      <main class="mt-1 main-content border-radius-lg">
        <slot />
      </main>
    </div>
    <Footer class="py-3 bg-white border-radius-lg" />
    <Configurator />
  </div>
</template>
<script setup>
import setTooltip from "@/assets/js/tooltip.js";

import bg from "@/assets/img/vr-bg.jpg";

import { useNavStore } from "~~/stores/NavStore";

const navStore = useNavStore();
const isCollapsed = computed(() => {
  return navStore.isSidenavCollapsed;
});
onMounted(() => {
  setTooltip(navStore.bootstrap);
});
useHead({
  bodyAttrs: {
    class: "virtual-reality",
  },
});
</script>
