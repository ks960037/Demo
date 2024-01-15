<template>
    <!-- 導覽列 -->
    <div class="container position-sticky z-index-sticky top-0">
        <div class="row">
            <div class="col-12">
                <nav :class="{ 'navbar-hidden': isNavbarHidden }"
                    class="navbar navbar-expand-lg  blur blur-rounded top-0  z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
                    <div class="container-fluid px-0">
                        <!-- 標題 -->
                        <a class="navbar-brand font-weight-bolder ms-sm-3" href="#" rel="tooltip" title="title"
                            data-placement="bottom" target="_self">
                            {{ $t('title') }}
                        </a>
                        <select class="btn btn-sm btn-round mb-0 ms-auto d-lg-none d-block"
                            style="padding:0 10px; height: 36px;line-height:36px;" v-model="locale">
                            <option value="en">en</option>
                            <option value="zh">中文</option>
                        </select>
                        <nuxt-link to="authentication/signin/basic"
                            class="btn btn-sm bg-gradient-primary btn-round mb-0 d-lg-none d-block">{{ $t('login')
                            }}</nuxt-link>
                        <div id="navigation" class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0">
                            <!-- 下拉菜單範例 -->
                            <ul class="navbar-nav navbar-nav-hover mx-auto">
                                <li class="nav-item dropdown dropdown-hover mx-2">
                                    <a href="#point1"
                                        class="nav-link ps-2 d-flex justify-content-between cursor-pointer align-items-center">
                                        {{ $t('point1') }}
                                    </a>
                                </li>
                                <li class="nav-item dropdown dropdown-hover mx-2">
                                    <a href="#point2"
                                        class="nav-link ps-2 d-flex justify-content-between cursor-pointer align-items-center">
                                        {{ $t('point2') }}
                                    </a>
                                </li>
                                <li class="nav-item dropdown dropdown-hover mx-2">
                                    <a href="#point3"
                                        class="nav-link ps-2 d-flex justify-content-between cursor-pointer align-items-center">
                                        {{ $t('point3') }}
                                    </a>
                                </li>
                            </ul>
                            <!-- 電腦版 -->
                            <ul class="navbar-nav d-lg-flex d-none">
                                <select class="mb-0 btn btn-sm btn-round"
                                    style="padding:0 10px; height: 36px;line-height:36px;" v-model="locale">
                                    <option value="en">en</option>
                                    <option value="zh">中文</option>
                                </select>
                                <li class="nav-item ms-1">
                                    <nuxt-link to="authentication/signin/basic"
                                        class="btn btn-sm bg-gradient-primary btn-round mb-0">{{ $t('login')
                                        }}</nuxt-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <!-- End Navbar -->
            </div>
        </div>
    </div>
</template>


<style>
.navbar-hidden {
    transform: translateY(-130%);
    transition: transform 0.3s ease-in-out;
}
</style>

<script setup>
import { useI18n } from 'vue-i18n'
import '@/assets/js/choices.min.js'
const { locale, setLocale } = useI18n()
</script>

<script>

export default {
    data() {
        return {
            lastScrollPosition: 0,
            isNavbarHidden: false
        };
    },
    methods: {
        handleScroll() {
            // console.log("開始滾動", window.scrollY);
            const currentScrollPosition = window.scrollY;
            if (currentScrollPosition > this.lastScrollPosition) {
                this.isNavbarHidden = true;
            } else {
                this.isNavbarHidden = false;
            }
            this.lastScrollPosition = currentScrollPosition;
            // console.log("結束", this.isNavbarHidden);
        }
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
        if (document.getElementById('choice-button')) {
            var element = document.getElementById('choice-button');
            const example = new Choices(element, {
                searchEnabled: false
            });
        }
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.handleScroll);
    }
};
</script>