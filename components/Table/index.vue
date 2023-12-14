<template>
  <div class="card">
    <div class="table-responsive">
      <table class="table align-items-center mb-0">
        <thead>
          <tr>
            <th
              class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              號碼
            </th>
            <th
              class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
            >
              狀態
            </th>
            <th
              class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
            >
              描述
            </th>
            <th
              class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              時間
            </th>
            <th
              class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              sid
            </th>
            <th
              class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              uid
            </th>
          </tr>
        </thead>
        <tbody>
          <TableRow v-for="report in reports" :key="report.sid" :report="report" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
// 定義 Report 介面
interface Report {
  mobile: string;
  report_desc: string;
  report_status: string;
  report_time: string;
  sid: string;
  uid: string;
}

// 使用 defineProps 定義 reports 屬性
const props = defineProps({
  reports: Array<Report>,
});
</script>
