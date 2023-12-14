<template>
  <div class="card">
    <div class="table-responsive">
      <table class="table align-items-center mb-0">
        <thead>
          <tr>
            <th class="text-start text-uppercase text-s font-weight-bolder opacity-7">
              uid
            </th>
            <th class="text-start text-uppercase text-s font-weight-bolder opacity-7">
              名稱
            </th>
            <th class="text-start text-uppercase text-s font-weight-bolder opacity-7">
              帳號
            </th>
            <th class="text-center text-uppercase text-s font-weight-bolder opacity-7">
              修改密碼
            </th>
            <th class="text-center text-uppercase text-s font-weight-bolder opacity-7">
              刪除帳號
            </th>
          </tr>
        </thead>
        <tbody>
          <TableAccountsItem
            v-for="data in datas"
            :key="data.uid"
            :data="data"
            @onDeletedUser="onDeletedUser"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
// 使用 defineProps 定義 reports 屬性
const props = defineProps({
  datas: Array<any>,
});
const emits = defineEmits(["onDeletedUser"]);
function onDeletedUser(){
  emits("onDeletedUser");
}
</script>
