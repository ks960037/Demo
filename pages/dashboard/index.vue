<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-6 col-12">
            <NuxtLink to="/dashboard/sendSMS">
              <cardsMiniStatisticsCard
                title="Send SMS"
                value="簡訊發送"
                description=""
                :icon="icon_send"
              />
            </NuxtLink>
          </div>
          <div class="col-lg-6 col-12">
            <NuxtLink to="/dashboard/sendingHistroy">
              <cardsMiniStatisticsCard
                title="History"
                value="發送紀錄"
                description=""
                :icon="icon_history"
              />
            </NuxtLink>
          </div>
        </div>
        <div
          class="card card-body blur text-md-start text-center px-sm-5 shadow-lg mt-sm-5 py-sm-5"
        >
          <h1 class="text-gradient text-primary mb-0">
            {{ $t("title") }}
          </h1>
          <h2 class="text-dark mb-4">
            {{ $t("slogan") }}
          </h2>
          <p class="lead text-dark pe-md-4 me-md-4">
            {{ $t("short-description") }}
          </p>
          <div class="buttons">
            <NuxtLink to="https://t.me/hk888online">
              <button type="button" class="btn btn-rounded bg-gradient-primary mt-4">
                {{ $t("contact-us") }}
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "default",
  middleware: "auth",
});

const icon_send = {
  component: "ni ni-money-coins",
  background: "bg-gradient-primary",
  shape: "rounded-circle",
};

const icon_history = {
  component: "ni ni-world",
  background: "bg-gradient-secondary",
  shape: "rounded-circle",
};
</script>
