<template>
  <div id="app-layout" :class="[isCollapsed && 'g-sidenav-hidden']">
    <div class="min-height-300 position-absolute w-100 bg-success" />
    <Sidenavs />
    <main class="main-content position-relative max-height-vh-100 h-100">
      <Navbar />
      <slot />
      <Footer />
      <Configurator />
    </main>
  </div>
</template>

<script setup>
import { useNavStore } from "~~/stores/NavStore";
import setTooltip from "~~/assets/js/tooltip";

const navStore = useNavStore();
const isCollapsed = computed(() => {
  return navStore.isSidenavCollapsed;
});

onMounted(() => {
  setTooltip(navStore.bootstrap);
  if (process.client) {
    if (window.innerWidth < 768)
      if (
        document.getElementById("app-layout").classList.add("g-sidenav-show")
      ) {
        /* empty */
      }
  }
});
useHead({
  bodyAttrs: {
    class: "bg-gray-100",
  },
});
</script>
