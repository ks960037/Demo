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
            <h1 class="p-2">創建帳號</h1>
          </div>
          <div class="card-body">
            <TableAccounts
              :datas="userList"
              @onDeletedUser="onDeletedUser"
            ></TableAccounts>
          </div>
          <br />
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <label for="name">名稱</label>
            <ArgonInput
              id="name"
              type="text"
              size="alternative"
              placeholder="Name"
              aria-label="Name"
              v-model="name"
              class="d-inline-block"
            />
            <label for="acc">帳號</label>
            <ArgonInput
              id="acc"
              type="text"
              size="alternative"
              placeholder="Account"
              aria-label="Account"
              v-model="account"
              class="d-inline-block"
            />
            <label for="password">密碼</label>
            <ArgonInput
              id="password"
              type="password"
              size="alternative"
              placeholder="Password"
              aria-label="Password"
              v-model="password"
              class="d-inline-block"
            />
            <ArgonButton color="success" @click="onCreateAcc">新增帳號</ArgonButton>
          </div>
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

// 讀取用戶清單

const { getUserList } = useAdmin();
const userList = ref([]);
onBeforeMount(() => {
  updateUserList();
});
async function updateUserList() {
  userList.value = await getUserList();
}

const isLoading = computed(() => {
  return !userList.value.length;
});

async function onDeletedUser() {
  updateUserList();
}

// 新增帳號

const { createUser } = useAdmin();
const name = ref("");
const account = ref("");
const password = ref("");
function resetInput() {
  name.value = "";
  account.value = "";
  password.value = "";
}
import Swal from "sweetalert2";
async function onCreateAcc() {
  if (name.value.length == 0 || account.value.length == 0 || password.value.length == 0)
    return Swal.fire("缺少資料");
  if (name.value == "admin") return Swal.fire("名稱不得為 admin");
  if (account.value == "admin") return Swal.fire("帳號不得為 admin");
  let result = null;
  try {
    result = await createUser({
      name: name.value,
      account: account.value,
      password: password.value,
    });
    console.log(result);
  } catch (e) {
    console.log(e);
    Swal.fire("未知的錯誤，請聯繫管理員");
  }

  if (result.code == 200) {
    Swal.fire("成功新增帳號");
  } else {
    switch (result.code) {
      case 500:
        Swal.fire("帳號重複");
        break;
      default:
        Swal.fire("未知的錯誤，請聯繫管理員");
        break;
    }
  }
  updateUserList();
  resetInput();
}
</script>
