<template>
  <tr>
    <td class="align-middle text-start text-s px-4">
      {{ data.account }}
    </td>
    <td class="align-middle text-start text-s px-4">
      {{ data.name }}
    </td>
    <td class="align-middle text-start text-s px-4">
      <input
        class="form-control-sm d-inline-block border w-100"
        type="number"
        min="1"
        name="globe"
        id=""
        v-model="data.SMART"
        v-on:change="onRateChange($event, 'SMART')"
      />
    </td>
    <td class="align-middle text-start text-s px-4">
      <input
        class="form-control-sm d-inline-block border w-100"
        type="number"
        min="1"
        name="globe"
        id=""
        v-model="data.GLOBE"
        v-on:change="onRateChange($event, 'GLOBE')"
      />
    </td>
    <td class="align-middle text-start text-s px-4">
      <input
        class="form-control-sm d-inline-block border w-100"
        type="number"
        min="1"
        name=""
        id=""
        v-model="data.DITO"
        v-on:change="onRateChange($event, 'DITO')"
      />
    </td>
    <td class="align-middle text-start text-s px-4">
      <input
        class="form-control-sm d-inline-block border w-100"
        type="number"
        min="1"
        name=""
        id=""
        v-model="data.CHERRY"
        v-on:change="onRateChange($event, 'CHERRY')"
      />
    </td>
    <td class="align-middle text-start text-s px-4">
      <input
        class="form-control-sm d-inline-block border w-100"
        type="number"
        min="1"
        name=""
        id=""
        v-model="data.OTHER"
        v-on:change="onRateChange($event, 'OTHER')"
      />
    </td>
    <td class="align-middle text-center text-s px-4">
      {{ userCredit }}
    </td>
    <td class="align-middle text-center text-s">
      <input
        type="number"
        placeholder="金額"
        class="form-control-sm d-inline-block border"
        v-model="amount"
      />
    </td>
    <td class="align-middle text-center text-s">
      <ArgonButton color="success" @click="onTopupClick" class="me-2">確認</ArgonButton>
      <ArgonButton color="info" @click="onResetClick">重設</ArgonButton>
    </td>
  </tr>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
});

const { getUserCredit } = useAdmin();
const userCredit = ref(0);
async function updateCredit() {
  const queriedCredit = (await getUserCredit(props.data._id)) as number;
  userCredit.value = queriedCredit;
}
onBeforeMount(() => {
  updateCredit();
});

const amount = ref(0);
function resetInput() {
  amount.value = 0;
}

const { topupUser } = useAdmin();
function onTopupClick() {
  Swal.fire({
    title: `替 ${props.data.name} 儲值：`,
    text: `確認儲值金額：${amount.value}`,
    showCancelButton: true,
    confirmButtonText: "確認",
    allowOutsideClick: () => !Swal.isLoading(),
  }).then(async (result) => {
    console.log("SWAL 回傳", result);
    if (result.isConfirmed) {
      let topup_result = await topupUser(props.data._id, amount.value);
      console.log("儲值結果：", topup_result);
      Swal.fire({
        title: `成功`,
        text: `已為 ${props.data.name} 儲值 ${amount.value}`,
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      updateCredit();
      resetInput();
    }
  });
}
function onResetClick() {
  resetInput();
}

const { changeSMSChargeRate } = useAdmin();
function onRateChange($event: any, type: string) {
  const rate = $event.target.value;
  // console.log("數值發生了改變", type, rate);
  changeSMSChargeRate(props.data._id, type, rate);
}
</script>
