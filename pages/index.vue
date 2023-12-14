<template>
  <NavbarLanding></NavbarLanding>
  <!-- 內容 -->
  <!-- 主標題部分 -->
  <header>
    <div class="page-header min-vh-85">
      <div>
        <img
          class="position-absolute fixed-top ms-auto w-50 h-100 z-index-0 d-none d-sm-none d-md-block border-radius-section border-top-end-radius-0 border-top-start-radius-0 border-bottom-end-radius-0"
          src="~/assets/img/BG.jpg" alt="image">
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-7 d-flex">
            <div class="card card-body blur text-md-start text-center px-sm-5 shadow-lg mt-sm-5 py-sm-5">
              <h1 class="text-gradient text-primary mb-0">
                {{ $t('title') }}
              </h1>
              <h2 class="text-dark mb-4">
                {{ $t('slogan') }}
              </h2>
              <p class="lead text-dark pe-md-4 me-md-4">
                {{ $t('short-description') }}
              </p>
              <div class="buttons">
                <NuxtLink to="https://t.me/hk888online">
                  <button type="button" class="btn btn-rounded bg-gradient-primary mt-4">
                    {{ $t('contact-us') }}
                  </button>
                </NuxtLink>
                <NuxtLink to="#">
                  <button type="button" class="btn btn-rounded btn-outline-secondary mt-4 ms-2">
                    {{ $t('read-more') }}
                  </button>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- 四大標語 -->
  <section class="py-md-7 pb-5">
    <div class="container">
      <div class="row text-center">
        <div class="col-lg-3 col-md-6">
          <div class="info">
            <h5 class="mt-2">
              {{ $t('feature1') }}
            </h5>
            <p>{{ $t('feature-description1') }}</p>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="info">
            <h5 class="mt-2">
              {{ $t('feature2') }}
            </h5>
            <p>{{ $t('feature-description2') }}</p>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="info">
            <h5 class="mt-2">
              {{ $t('feature3') }}
            </h5>
            <p>{{ $t('feature-description3') }}</p>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="info">
            <h5 class="mt-2">
              {{ $t('feature4') }}
            </h5>
            <p>{{ $t('feature-description4') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 主要賣點 -->
  <section id="point1">
    <div class="container">
      <div class="row">
        <div class="col-md-6 ms-auto me-auto text-center">
          <h2 class="text-gradient text-primary">
            {{ $t('point-title1') }}
          </h2>
          <p>
            {{ $t('point-description1') }}
          </p>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-md-6 position-relative">
          <div class="position-relative ms-md-5 me-md-n5">
            <div class="blur-shadow-image">
              <img class="image-left rounded-3 img-fluid position-relative top-0 end-0 bg-cover"
                src="https://image.cache.storm.mg/styles/smg-800x533-fp/s3/media/image/2023/04/10/20230410-051717_U27054_M843731_bf11.jpg?itok=aui0rut4"
                alt="image">
            </div>
          </div>
          <div class="position-absolute bottom-0 mb-5 ms-n2 me-3 start-0 end-2 d-md-block d-none">
            <div class="blur-shadow-image">
              <img class="image-container rounded-3 img-fluid position-relative bg-cover"
                src="https://cw-image-resizer.cwg.tw/resize/uri/https%3A%2F%2Fstorage.googleapis.com%2Fwww-cw-com-tw%2Farticle%2F202010%2Farticle-5f8ecc2cc3961.jpg/?w=1600&format=webp"
                alt="image">
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <div class="position-relative ms-n4 mb-5 mt-8 d-md-block d-none">
            <div class="blur-shadow-image">
              <img class="image-right rounded-3 img-fluid position-relative bg-cover"
                src="https://storage.googleapis.com/www-cheers-com-tw/article/202002/article-5e4757c6e78ee.jpg"
                alt="image">
            </div>
          </div>
          <h3 class="mb-4">
            {{ $t('little-title') }}
          </h3>
          <p>
            {{ $t('little-description1') }}
          </p>
          <p>
            {{ $t('little-description2') }}
          </p>
          <p>
            {{ $t('little-description3') }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-gradient-primary position-relative overflow-hidden">
    <!-- 波浪分隔 start -->
    <div class="position-absolute w-100 z-inde-1 top-0 mt-n3">
      <svg width="100%" viewBox="0 -2 1920 157" version="1.1" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>wave-down</title>
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g fill="#FFFFFF" fill-rule="nonzero">
            <g id="wave-down">
              <path id="Path-Copy-2"
                d="M0,60.8320331 C299.333333,115.127115 618.333333,111.165365 959,47.8320321 C1299.66667,-15.5013009 1620.66667,-15.2062179 1920,47.8320331 L1920,156.389409 L0,156.389409 L0,60.8320331 Z"
                transform="translate(960.000000, 78.416017) rotate(180.000000) translate(-960.000000, -78.416017) " />
            </g>
          </g>
        </g>
      </svg>
    </div>
    <div class="container py-lg-10 py-7" id="point2">
      <div class="row">
        <div class="col-lg-6 d-flex justify-content-center flex-column">
          <div id="carouselExampleIndicator" class="carousel slide py-7" data-bs-ride="carousel">
            <!-- 輪播標記 -->
            <div class="carousel-indicators justify-content-start ms-0">
              <a href="javascript:;">
                <img src="~/assets/img/google.svg" alt="..."
                  class="avatar avatar-sm avatar-scale-up shadow border-0 active"
                  data-bs-target="#carouselExampleIndicator" data-bs-slide-to="0">
                <span class="text-white mx-2">&#124;</span>
              </a>
              <a href="javascript:;">
                <img src="~/assets/img/google.svg" alt="..." class="avatar avatar-sm avatar-scale-up shadow border-0"
                  data-bs-target="#carouselExampleIndicator" data-bs-slide-to="1">
                <span class="text-white mx-2">&#124;</span>
              </a>
              <a href="javascript:;">
                <img src="~/assets/img/google.svg" alt="..." class="avatar avatar-sm avatar-scale-up shadow border-0"
                  data-bs-target="#carouselExampleIndicator" data-bs-slide-to="2">
              </a>
            </div>
            <!-- 輪播內容 -->
            <div class="carousel-inner">
              <h2 class="text-white mb-0">
                {{ $t('tech-supporter') }}
              </h2>
              <p class="text-white opacity-8 mb-1">
                {{ $t('tech-desc') }}
              </p>
              <hr class="text-white horizontal opacity-6 mb-4 mt-2 w-25 text-start">
              <!-- 輪播資訊 -->
              <div class="carousel-item active">
                <h6 class="text-white opacity-8 pe-5">
                  {{ $t('supporter-desc') }}
                </h6>
              </div>
              <div class="carousel-item">
                <h6 class="text-white opacity-8 pe-5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat at
                  quasi nemo delectus recusandae aspernatur numquam ipsum odio enim earum doloremque libero magnam, totam
                  tempore corporis ut repellat accusamus officiis?
                </h6>
              </div>
              <div class="carousel-item">
                <h6 class="text-white opacity-8 pe-5">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab quae
                  mollitia vero, facilis molestiae qui incidunt velit, accusamus id necessitatibus ad in eveniet, illo
                  iusto doloremque! Et officia iusto illum!
                </h6>
                <div class="author mt-4">
                  <div class="name">
                    <span class="text-white">consectetur adipisicing</span>
                    <div class="stats">
                      <small class="text-white opacity-6">sapiente consequuntur</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 合作夥伴 logo 群 -->
        <div class="col-md-6 justify-content-center flex-column d-sm-none d-md-none d-lg-flex d-xl-flex">
          <div class="row justify-content-center d-none d-md-flex">
            <div class="col-1 mb-4" />
            <div class="col-5 mb-4">
              <div class="d-block bg-white avatar avatar-lg rounded-circle p-3 ms-6 mt-2 fadeIn3 fadeInBottom">
                <img src="~/assets/img/google.svg" alt="Logo Image">
              </div>
            </div>
            <div class="col-4 mb-4">
              <div class="d-block bg-white avatar avatar-lg rounded-circle p-3 ms-6 mt-2 fadeIn3 fadeInBottom">
                <img src="~/assets/img/google.svg" alt="Logo Image">
              </div>
            </div>
          </div>
          <div class="row justify-content-end d-none d-md-flex">
            <div class="col-4 my-4">
              <div class="d-block bg-white avatar avatar-lg rounded-circle p-3 ms-4 fadeIn1 fadeInBottom">
                <img src="~/assets/img/google.svg" alt="Logo Image">
              </div>
            </div>
            <div class="col-3 my-4">
              <div class="d-block bg-white avatar avatar-lg rounded-circle p-3 me-auto fadeIn1 fadeInBottom">
                <img src="~/assets/img/google.svg" alt="Logo Image">
              </div>
            </div>
            <div class="col-3 my-4">
              <div class="d-block bg-white avatar avatar-lg rounded-circle p-3 fadeIn3 fadeInBottom ms-3 mt-3">
                <img src="~/assets/img/google.svg" alt="Logo Image">
              </div>
            </div>
          </div>
          <div class="row d-none d-md-flex">
            <div class="col-6">
              <div class="d-block bg-white avatar avatar-lg rounded-circle p-3 ms-auto mt-5 fadeIn2 fadeInBottom">
                <img src="~/assets/img/google.svg" alt="Logo Image">
              </div>
            </div>
            <div class="col-6 mt-6">
              <!-- Logo -->
              <div class="d-block bg-white avatar avatar-lg rounded-circle p-3 mx-auto mt-n3 fadeIn3 fadeInBottom">
                <img src="~/assets/img/google.svg" alt="Logo Image">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 波浪分隔 end -->
    <div class="position-absolute w-100 bottom-0">
      <svg width="100%" viewBox="0 -1 1920 166" version="1.1" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>wave-up</title>
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g transform="translate(0.000000, 5.000000)" fill="#FFFFFF" fill-rule="nonzero">
            <g id="wave-up" transform="translate(0.000000, -5.000000)">
              <path
                d="M0,70 C298.666667,105.333333 618.666667,95 960,39 C1301.33333,-17 1621.33333,-11.3333333 1920,56 L1920,165 L0,165 L0,70 Z" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  </section>
  <section class="py-7">
    <div class="container" id="point3">
      <div class="row">
        <div class="col-md-5 ms-auto me-auto text-center">
          <div class="p-3 info-hover-warning">
            <div class="icon icon-shape bg-gradient-primary shadow icon-shape-circle text-primary">
              <i class="fa fa-cogs" />
            </div>
            <h3 class="text-gradient text-primary mb-0 mt-4">
              {{ $t('title-using-scene') }}
            </h3>
          </div>
          <p>{{ $t('description-using-scene') }}</p>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-md-4 ms-auto my-auto">
          <div class="cursor-pointer">
            <div class="card card-background tilt" data-tilt="">
              <div class="full-background"
                style="background-image: url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');" />
              <div class="card-body pt-7 text-center">
                <div class="icon icon-lg up mb-3">
                  <img src="~/assets/img/converse.svg" alt="交談圖標">
                </div>
                <h2 class="text-white up mb-0">
                  {{ $t('using-scene1') }}
                </h2>
                <p class="lead up">
                  {{ $t('role-play1') }}
                </p>
                <button type="button" class="btn btn-white btn-lg mt-3 up">
                  {{ $t('get-started') }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-5 me-auto my-auto ms-md-5">
          <div class="p-3 info-horizontal d-flex">
            <div>
              <h5>{{ $t('scene1-title1') }}</h5>
              <p>
                {{ $t('scene1-desc1') }}
              </p>
            </div>
          </div>
          <div class="p-3 info-horizontal d-flex">
            <div>
              <h5>{{ $t('scene1-title2') }}</h5>
              <p>
                {{ $t('scene1-desc2') }}
              </p>
            </div>
          </div>
          <div class="p-3 info-horizontal d-flex">
            <div>
              <h5>{{ $t('scene1-title3') }}</h5>
              <p>
                {{ $t('scene1-desc3') }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr class="dark my-md-6 mt-2 mx-7">
      <div class="row">
        <div class="col-md-5 ms-auto my-auto">
          <div class="p-3 info-horizontal d-flex">
            <div>
              <h5>{{ $t('scene2-title1') }}</h5>
              <p>
                {{ $t('scene2-desc1') }}
              </p>
            </div>
          </div>
          <div class="p-3 info-horizontal d-flex">
            <div>
              <h5>{{ $t('scene2-title2') }}</h5>
              <p>
                {{ $t('scene2-desc2') }}
              </p>
            </div>
          </div>
          <div class="p-3 info-horizontal d-flex">
            <div>
              <h5>{{ $t('scene2-title3') }}</h5>
              <p>
                {{ $t('scene2-desc3') }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-4 me-auto my-auto ms-md-5">
          <div class="cursor-pointer">
            <div class="card card-background tilt" data-tilt="">
              <div class="full-background"
                style="background-image: url('https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');" />
              <div class="card-body pt-7 text-center">
                <div class="icon icon-lg up mb-3">
                  <img src="~/assets/img/converse.svg" alt="交談圖標">
                </div>
                <h2 class="text-white up mb-0">
                  {{ $t('using-scene2') }}
                </h2>
                <p class="lead up">
                  {{ $t('role-play2') }}
                </p>
                <button type="button" class="btn btn-white btn-lg mt-3 up">
                  {{ $t('get-started') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 公司資訊&版權宣告 -->
  <footer class="footer pt-5 mt-5">
    <hr class="horizontal dark mb-5">
    <div class="container">
      <div class=" row">
        <div class="col-md-3 mb-4 ms-auto">
          <div>
            <h6 class="text-gradient text-primary font-weight-bolder">
              {{ $t('title') }}
            </h6>
          </div>
          <div>
            <h6 class="mt-3 mb-2 opacity-8">
              {{ $t('slogan') }}
            </h6>
            <ul class="d-flex flex-row ms-n3 nav">
              <li class="nav-item">
                <a class="nav-link pe-1" href="https://www.facebook.com/" target="_blank">
                  <i class="fab fa-facebook text-lg opacity-8"></i>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link pe-1" href="https://twitter.com/" target="_blank">
                  <i class="fab fa-twitter text-lg opacity-8"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-2 col-sm-6 col-6 mb-4">
          <div>
            <h6 class="text-gradient text-primary text-sm">
              Company
            </h6>
            <ul class="flex-column ms-n3 nav">
              <li class="nav-item">
                <a class="nav-link" href="https://www.google.com/" target="_blank">
                  About Us
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.google.com/" target="_blank">
                  blog
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-2 col-sm-6 col-6 mb-4">
          <div>
            <h6 class="text-gradient text-primary text-sm">
              Resources
            </h6>
            <ul class="flex-column ms-n3 nav">
              <li class="nav-item">
                <a class="nav-link" href="https://www.google.com/" target="_blank">
                  Lorem, ipsum dolor
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.google.com/" target="_blank">
                  sit amet consectetur
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.google.com/" target="_blank">
                  adipisicing elit.
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.google.com/" target="_blank">
                  aspernatur tenetur
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-2 col-sm-6 col-6 mb-4">
          <div>
            <h6 class="text-gradient text-primary text-sm">
              Help & Support
            </h6>
            <ul class="flex-column ms-n3 nav">
              <li class="nav-item">
                <a class="nav-link" href="https://www.google.com/" target="_blank">
                  Lorem, ipsum dolor
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.google.com/" target="_blank">
                  sit amet consectetur
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.google.com/" target="_blank">
                  adipisicing elit.
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.google.com/" target="_blank">
                  aspernatur tenetur
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-2 col-sm-6 col-6 mb-4 me-auto">
          <div>
            <h6 class="text-gradient text-primary text-sm">
              Legal
            </h6>
            <ul class="flex-column ms-n3 nav">
              <li class="nav-item">
                <a class="nav-link" href="https://www.google.com/" target="_blank">
                  Terms &amp; Conditions
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.google.com/" target="_blank">
                  Privacy Policy
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.google.com/" target="_blank">
                  Licenses (EULA)
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12">
          <div class="text-center">
            <p class="my-4 text-sm">
              All rights reserved. Copyright ©
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
definePageMeta({
  layout: false,
});
</script>