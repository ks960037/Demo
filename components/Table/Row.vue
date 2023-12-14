<template>
  <tr>
    <td>
      <div class="d-flex px-2 py-1">
        <div class="d-flex flex-column justify-content-center">
          <h6 class="mb-0 text-sm">{{ report.mobile }}</h6>
        </div>
      </div>
    </td>
    <td>
      <p class="text-sm text-secondary mb-0">{{ report.report_status }}</p>
    </td>
    <td>
      <span class="badge badge-dot me-4">
        <i class="bg-success"></i>
        <span class="text-dark text-xs">{{ report.report_desc }}</span>
      </span>
    </td>
    <td class="align-middle text-center text-sm">
      <p class="text-secondary mb-0 text-sm">{{ new Date(report.report_time) }}</p>
    </td>
    <td class="align-middle text-center">
      <span class="text-secondary text-sm">{{ report.sid }}</span>
    </td>
    <td class="align-middle text-center">
      <span class="text-secondary text-sm">{{ report.uid }}</span>
    </td>
  </tr>
</template>

<script setup lang="ts">
interface Report {
  mobile: string;
  report_desc: string;
  report_status: string;
  report_time: string;
  sid: string;
  uid: string;
}

const props = defineProps({
  report: {
    type: Object,
    default: null,
  },
});
</script>
