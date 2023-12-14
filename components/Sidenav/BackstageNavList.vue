<template>
  <div id="sidenav-collapse-main" class="collapse navbar-collapse w-auto h-auto h-100">
    <ul class="navbar-nav">
      <li class="nav-item">
        <nuxt-link to="/backstage/accountCreate">
          <sidenav-collapse nav-text="創建帳號" :collapse="false" url="/sendSMS" :aria-controls="''" collapse-ref="">
            <template #icon>
              <!-- icon 插槽 -->
              <i class="ni ni-world-2 text-primary text-sm opacity-10"></i>
            </template>
          </sidenav-collapse>
        </nuxt-link>
        <nuxt-link to="/backstage/accountTopup">
          <sidenav-collapse nav-text="帳號儲值" :collapse="false" url="#" :aria-controls="''" collapse-ref="">
            <template #icon>
              <i class="ni ni-align-left-2 text-sm" :class="sidenavType"></i>
            </template>
          </sidenav-collapse>
        </nuxt-link>
      </li>
    </ul>
  </div>
  <!-- 側邊欄下方 -->
  <div class="mt-3 sidenav-footer">
    <!-- 資訊卡 -->
    <SidenavCard :card="{
      title: '簡訊發送平台',
      description: '說明鏈接',
      links: [
      ],
    }" />
  </div>
</template>
<script setup>
import SidenavCollapse from "./SidenavCollapse.vue";
import SidenavCard from "./SidenavCard.vue";
import { useNavStore } from "~~/stores/NavStore";
const navStore = useNavStore();

const sidenavType = computed(() => {
  return navStore.sidenavType === "bg-white" ? "text-dark" : "text-white";
});
const getRoute = computed(() => {
  const route = useRoute();
  return route.path.split("/")[1];
});
defineProps({
  isRTL: {
    type: Boolean,
    default: false,
  },
});
</script>
