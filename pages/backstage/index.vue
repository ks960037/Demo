<template>
  <div class="container-fluid">
    <div class="row">
      <div class="mx-auto col-12">
        <div class="mt-4 card card-body">
          <h1>後臺管理</h1>
          <div class="row">
            <div class="col-lg-6 col-12">
              <NuxtLink to="/backstage/accountCreate">
                <cardsMiniStatisticsCard
                  title="Create account"
                  value="創建帳號"
                  description="創建新帳號"
                  :icon="icon_create"
                />
              </NuxtLink>
            </div>
            <div class="col-lg-6 col-12">
              <NuxtLink to="/backstage/accountTopup">
                <cardsMiniStatisticsCard
                  title="Topup"
                  value="帳號儲值"
                  description="為已建立的帳號進行儲值"
                  :icon="icon_topup"
                />
              </NuxtLink>
            </div>
          </div>
          <div class="row">
            <chartsGradientLineChart
              :chart-options="{
                chart: {
                  type: 'area',
                },
                colors: ['#4BB543'],
                labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                dataLabels: {
                  enabled: false,
                },
                stroke: {
                  curve: 'smooth',
                },
                legend: {
                  show: false,
                },
              }"
              :series="[
                {
                  name: 'Mobile Apps',
                  data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                },
              ]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const icon_create = {
  component: "ni ni-zoom-split-in",
  background: "bg-gradient-info",
  shape: "rounded-circle",
};
const icon_topup = {
  component: "ni ni-money-coins",
  background: "bg-gradient-success",
  shape: "rounded-circle",
};

definePageMeta({
  layout: "backstage",
  middleware: "auth-admin",
});
</script>
