<template>
  <NuxtLayout name="authentication">
    <div class="landing-bg h-100 bg-gradient-primary position-fixed w-100"></div>
    <div class="page-header min-vh-100">
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
                      type="account"
                      placeholder="Account"
                      aria-label="Account"
                      v-model="userInfo.account"
                    />
                  </div>
                  <div class="mb-3">
                    <ArgonInput
                      id="password"
                      type="password"
                      placeholder="Password"
                      aria-label="Password"
                      v-model="userInfo.password"
                    />
                  </div>

                  <div class="text-center">
                    <ArgonButton
                      color="primary"
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
const user = useAuthUser();
const { initAuth, login } = useAuth();

definePageMeta({
  layout: false,
});

onBeforeMount(async () => {
  // 檢查目前登入狀態
  if (user.value && user.value.name == "admin") return navigateTo("./backstage");
  // 自動登入;
  console.log("進行自動登入程序");
  let result = await initAuth();
  if (result) {
    console.log("登入結果：", result);
    if (user.value && user.value.name == "admin") {
      return navigateTo("./backstage");
    }
  }
});

const userInfo = {
  account: "",
  password: "",
  rememberMe: true,
};

async function buttomHandler() {
  const logResult = await login(userInfo.account, userInfo.password);
  if (logResult && user.value.name == "admin") {
    navigateTo("./backstage");
  }
}
</script>
