<template>
  <div class="container-fluid">
    <!-- 讀取動畫 -->
    <div v-if="isLoading" class="row">
      <div class="col">
        <div class="card justify-content-center align-items-center py-2 mt-4">
          <UISpinner />
        </div>
      </div>
    </div>
    <div v-else class="row">
      <div class="col">
        <div class="mt-4 card">
          <div class="card-head">
            <h1 class="p-2">帳號儲值</h1>
          </div>
          <div class="card-body">
            <TableTopup :datas="userList" @onTopupUser="onTopupUser"></TableTopup>
          </div>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "backstage",
  middleware: "auth-admin",
});

const { getUserList } = useAdmin();
const userList = ref([]);
onBeforeMount(async () => {
  userList.value = await getUserList();
});

const isLoading = computed(() => {
  return !userList.value.length;
});

async function onTopupUser() {
  // 儲值成功後刷新
  userList.value = await getUserList();
}
</script>
