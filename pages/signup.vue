<template>
  <NuxtLayout name="authentication">
    <template #navbar>
      <NavbarLanding
        is-blur="blur border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
        btn-background="bg-gradient-success"
        :dark-mode="true"
      />
    </template>
    <div
      class="page-header min-vh-100"
      style="
        background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-basic.jpg');
      "
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container mt-4">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-7">
            <div class="card z-index-0">
              <div class="card-header text-center pt-4">
                <h5>Register with</h5>
              </div>
              <div class="card-body">
                <form role="form">
                  <ArgonInput
                    type="text"
                    placeholder="Name"
                    aria-label="Name"
                    v-model="name"
                  />
                  <ArgonInput
                    id="email"
                    type="email"
                    placeholder="Email"
                    aria-label="Email"
                    v-model="email"
                  />
                  <ArgonInput
                    id="password"
                    type="password"
                    placeholder="Password"
                    aria-label="Password"
                    v-model="password"
                  />
                  <ArgonCheckbox id="flexCheckDefault" name="flexCheckDefault" checked>
                    <label class="form-check-label" for="flexCheckDefault">
                      I agree the
                      <a href="javascript:;" class="text-dark font-weight-bolder"
                        >Terms and Conditions</a
                      >
                    </label>
                  </ArgonCheckbox>
                  <div class="text-center">
                    <ArgonButton
                      type="button"
                      full-width
                      color="dark"
                      variant="gradient"
                      class="my-4 mb-2"
                      @click="register"
                      >Sign up
                    </ArgonButton>
                  </div>
                  <p class="text-sm mt-3 mb-0">
                    Already have an account?
                    <NuxtLink to="/login" class="text-dark font-weight-bolder">
                      Login
                    </NuxtLink>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <FooterCentered />
    </template>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  layout: false,
});
</script>

<script>
export default {
  components: {},
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  computed: {},
  mounted() {},
  methods: {
    async register() {
      try {
        // 發送到後端
        const response = await $fetch(`/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: {
            name: this.name,
            email: this.email,
            password: this.password,
          },
        });

        if (response.success) {
          // 如果註冊成功，你可以將用戶重定向到登入頁面或其他頁面
          this.$router.push("/login");
        } else {
          this.error = response.data.message; // 如果註冊失敗，顯示錯誤訊息
        }
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>
