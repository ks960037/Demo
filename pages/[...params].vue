<template>
    <div class="container">
        <div class="row">
            <div class="col text-align-center">
                <h1 class="">404</h1>
                <p class="">Not Found</p>
                <p class="">真的是找不到這個頁面啦 😓</p>
            </div>
        </div>
    </div>
</template>

<script setup>
setResponseStatus(404)
definePageMeta({
    layout: false,
});
</script>