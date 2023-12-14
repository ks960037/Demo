<template>
  <div>
    <div class="landing-bg h-100 bg-gradient-primary position-fixed w-100"></div>
    <SidenavBackstage />
    <main class="main-content position-relative border-radius-lg">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { useNavStore } from "~~/stores/NavStore";
const navStore = useNavStore();
navStore.sidenavType = "bg-default bg-transparent";
onUnmounted(() => {
  navStore.sidenavType = "bg-white";
});
</script>
