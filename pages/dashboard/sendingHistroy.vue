<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12 mt-4 mt-md-0">
        <ReviewCard
          title="Reviews"
          description="More than
          <b>1,500,000</b> developers used Creative Tim's products and over
          <b>700,000</b> projects were created."
          :reviews="[
            {
              title: '用量',
              value: 80,
              color: 'info',
            },
          ]"
        />
      </div>
    </div>
    <div v-if="hasReport" class="row mt-4">
      <div class="col-12">
        <Table :reports="sendReport" />
      </div>
    </div>
    <div v-else class="row mt-4">
      <div class="col-12">
        <div class="card text-center">
          <div class="card-body">
            <span>目前沒有傳送報告 🧐</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-1">
      <div class="col text-end">
        <ArgonButton
          type="button"
          full-width
          color="primary"
          variant="gradient"
          class="my-4 mb-2"
          @click="refresh"
          >刷新
        </ArgonButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import ReviewCard from "~~/pagesComponents/pages/users/ReviewCard.vue";
import Swal from "sweetalert2";

definePageMeta({
  layout: "default",
  middleware: "auth",
});

const sendReport = ref({});
onBeforeMount(() => {
  sendReport.value = report.value.data;
});

const { data: report } = await useAsyncData("getReport", () =>
  useFetchWithToken("/api/sendSMS/getReport", { method: "POST" })
);
console.log("資料", report.value.data);

const hasReport = computed(() => {
  return report.value?.data.lenght ? true : false;
});

// 發送 log 到 cloudwatch
const { sendLog } = useCloudwatchLogger();
async function refresh() {
  sendLog("sendingHistroy", "按下 刷新");
  try {
    const res = await useFetchWithToken("/api/sendSMS/getReport", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    sendLog("sendingHistroy", `刷新 結果:${JSON.stringify(res)}`);
    console.log(res.data);
    sendReport.value = res.data;
    if (res.code == 0) {
      Swal.fire({
        title: res.code,
        text: res.msg,
        icon: "success",
        iconColor: "blue",
        toast: true,
        position: "bottom-end",
        timer: 1500,
        showConfirmButton: false,
      });
    } else if (res.code == -12) {
      Swal.fire({
        title: res.code,
        text: res.msg,
        icon: "error",
        iconColor: "red",
        toast: true,
        position: "bottom-end",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  } catch (e) {
    console.log(e);
    Swal.fire({
      text: e.message,
      icon: "error",
      customClass: {
        confirmButton: "btn bg-gradient-success",
      },
      buttonsStyling: false,
    });
  }
}
</script>
