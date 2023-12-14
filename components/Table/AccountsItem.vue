<template>
  <tr>
    <td class="align-middle text-start text-s px-4">
      {{ data._id }}
    </td>
    <td class="align-middle text-start text-s px-4">
      {{ data.name }}
    </td>
    <td class="align-middle text-start text-s px-4">
      {{ data.account }}
    </td>
    <td class="align-middle text-center text-s">
      <ArgonButton color="info" @click="onResetPassword">修改密碼</ArgonButton>
    </td>
    <td class="align-middle text-center text-s">
      <ArgonButton color="danger" @click="onDeleteAccount">刪除帳號</ArgonButton>
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

const { resetPassword } = useAdmin();
function onResetPassword() {
  Swal.fire({
    title: `修改${props.data.name}的密碼重設為：`,
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "確認",
    showLoaderOnConfirm: true,
    preConfirm: async (input) => {
      console.log(input);
      try {
        const newPassword = input;
        const response = await resetPassword(props.data._id, newPassword);
        return response;
      } catch (error) {
        Swal.showValidationMessage(`
        Request failed: ${error}
      `);
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    console.log(result);
    if (result.isConfirmed) {
      Swal.fire({
        title: `成功`,
        text: `已修改 ${result.value.name} 的密碼`,
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  });
}

const emits = defineEmits(["onDeletedUser"]);
const { deleteAccount } = useAdmin();
function onDeleteAccount() {
  Swal.fire({
    title: `你確定要刪除 ${props.data.name} ？`,
    text: "刪除後有關資料無法復原",
    confirmButtonText: "確認發送",
    cancelButtonText: "取消",
    showCancelButton: true,
    reverseButtons: true,
    customClass: {
      confirmButton: "btn bg-gradient-success",
      cancelButton: "btn bg-gradient-danger",
    },
    buttonsStyling: false,
  }).then(async (result) => {
    console.log("輸入", result);
    if (result.isConfirmed) {
      // 確認
      await deleteAccount(props.data._id);
      emits("onDeletedUser");
    }
  });
}
</script>
