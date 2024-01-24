<template>
    <div class="container-fluid">
        <div class="row">
            <div class="mx-auto col-12">
                <div class="mt-4 card card-body">
                    <h1>
                        後臺管理
                    </h1>
                    <div class="row">
                        <div v-for="{
                            title,
                            value,
                            description,
                            icon: { component, background, shape },
                            link,
                        } of cardData" :key="title" class="col-lg-3 col-md-6 col-12">
                            <cardsMiniStatisticsCard :title="title" :value="value" :description="description" :link="link"
                                :icon="{
                                    component: component,
                                    background: background,
                                    shape: shape,
                                }" />
                        </div>
                    </div>
                    <div class="row">
                        <cardsGradientLineChart :chart-options="{
                            chart: {
                                type: 'area',
                            },
                            colors: ['#4BB543'],
                            labels: [
                                'Apr',
                                'May',
                                'Jun',
                                'Jul',
                                'Aug',
                                'Sep',
                                'Oct',
                                'Nov',
                                'Dec',
                            ],
                            dataLabels: {
                                enabled: false,
                            },
                            stroke: {
                                curve: 'smooth',
                            },
                            legend: {
                                show: false,
                            },
                        }" :series="[
    {
        name: 'Mobile Apps',
        data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
    },
]" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const cardData = [
    {
        title: "",
        value: "創建帳號",
        description: `創建新帳號`,
        icon: {
            component: "ni ni-zoom-split-in",
            background: "bg-gradient-info",
            shape: "rounded-circle",
        },
        link: "/backstage/accountCreate",
    },
    {
        title: "",
        value: "帳號儲值",
        description: `為已建立的帳號進行儲值`,
        icon: {
            component: "ni ni-money-coins",
            background: "bg-gradient-success",
            shape: "rounded-circle",
        },
        link: "/backstage/accountTopup",
    },
];
</script>
<script>
definePageMeta({
    layout: "backstage",
});
</script>