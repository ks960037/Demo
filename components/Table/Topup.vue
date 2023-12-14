<template>
  <div class="card">
    <div class="table-responsive">
      <table class="table align-items-center mb-0">
        <thead>
          <tr>
            <th class="text-start text-uppercase text-s font-weight-bolder opacity-7">
              帳號
            </th>
            <th class="text-start text-uppercase text-s font-weight-bolder opacity-7">
              名稱
            </th>
            <th class="text-start text-uppercase text-s font-weight-bolder opacity-7">
              SMART
            </th>
            <th class="text-start text-uppercase text-s font-weight-bolder opacity-7">
              GLOBE
            </th>
            <th class="text-start text-uppercase text-s font-weight-bolder opacity-7">
              DITO　
            </th>
            <th class="text-start text-uppercase text-s font-weight-bolder opacity-7">
              CHERRY
            </th>
            <th class="text-start text-uppercase text-s font-weight-bolder opacity-7">
              OTHER
            </th>
            <th class="text-center text-uppercase text-s font-weight-bolder opacity-7">
              當前餘額
            </th>
            <th class="text-center text-uppercase text-s font-weight-bolder opacity-7">
              儲值金額
            </th>
            <th
              class="text-center text-uppercase text-s font-weight-bolder opacity-7"
            ></th>
          </tr>
        </thead>
        <tbody>
          <TableTopupItem v-for="data in datas" :key="data.uid" :data="data" />
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
</script>
