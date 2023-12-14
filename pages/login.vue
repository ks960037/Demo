<template>
  <NuxtLayout name="authentication">
    <template #navbar>
      <!-- 這個導覽有問題 -->
      <NavbarLanding
        is-blur="blur border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
        btn-background="bg-gradient-success"
        :dark-mode="true"
      />
    </template>
    <div
      class="page-header min-vh-100"
      style="
        background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-basic.jpg');
      "
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-7 mt-2">
            <div class="card border-0 mb-0">
              <div class="card-header bg-transparent">
                <h5 class="text-dark text-center mt-2 mb-3">Login</h5>
              </div>

              <div class="card-body px-lg-5 pt-0">
                <form role="form" class="text-start">
                  <div class="mb-3">
                    <ArgonInput
                      id="account"
                      type="text"
                      placeholder="Account"
                      aria-label="Account"
                      v-model="userInfo.account"
                    />
                  </div>
                  <div>
                    <ArgonInput
                      id="password"
                      type="password"
                      placeholder="Password"
                      aria-label="Password"
                      v-model="userInfo.password"
                    />
                  </div>
                  <!-- <ArgonSwitch
                    id="rememberMe"
                    name="rememberMe"
                    v-model="userInfo.rememberMe"
                  >
                    Remember me
                  </ArgonSwitch> -->

                  <div class="text-center">
                    <ArgonButton
                      color="success"
                      variant="gradient"
                      full-width
                      class="my-4 mb-2"
                      @click.prevent="buttomHandler"
                      >Login</ArgonButton
                    >
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import SWAL from "sweetalert2";
let user = useAuthUser();
const { initAuth } = useAuth();

definePageMeta({
  layout: false,
});

onBeforeMount(async () => {
  try {
    // 檢查目前登入狀態
    if (user.value) return navigateTo("./backstage");
    // 自動登入;
    console.log("進行自動登入程序");
    let result = await initAuth();
    if (result) {
      console.log("登入結果：", result);
      if (user.value) {
        return navigateTo("./dashboard");
      }
    }
  } catch (e) {
    console.log(e);
  }
});

const userInfo = {
  account: "",
  password: "",
  rememberMe: true,
};

async function buttomHandler() {
  // 資料檢查
  if (!userInfo.account) {
    SWAL.fire({
      title: "請輸入帳號",
      icon: "info",
      iconColor: "red",
      showConfirmButton: false,
      confirmButtonText: "確定",
    });
    return;
  }
  if (!userInfo.password) {
    SWAL.fire({
      title: "請輸入密碼",
      icon: "info",
      iconColor: "red",
      showConfirmButton: false,
      confirmButtonText: "確定",
    });
    return;
  }
  // 處理登入流程
  const { login } = useAuth();
  try {
    const logResult = await login(userInfo.account, userInfo.password);
    if (logResult) {
      navigateTo("/dashboard");
    }
  } catch (e) {
    // console.log(e);
    SWAL.fire({
      title: "帳號密碼錯誤",
      icon: "error",
      showConfirmButton: false,
      confirmButtonText: "確定",
    });
    return;
  }
}
</script>
