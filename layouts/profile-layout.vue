<template>
  <div>
    <div class="position-absolute w-100 min-height-300 top-0" :style="{
      'background-image': 'url(' + image + ')',
      'background-position-y': '50%',
    }">
      <span class="mask bg-success opacity-6"></span>
    </div>
    <Sidenav />

    <main class="mt-1 main-content border-radius-lg">
      <slot />
      <Footer class="py-3 bg-white border-radius-lg" />
    </main>
  </div>
</template>
<script setup>
import image from "@/assets/img/profile-layout-header.jpg";
import setNavPills from "~~/assets/js/nav-pills";

onMounted(() => {
  setNavPills();
});

useHead({
  bodyAttrs: {
    class: "profile-overview",
  },
});
</script>
