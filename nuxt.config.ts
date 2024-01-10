// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: "SMS Hub",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.png",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css",
        },
      ],
      script: [
        {
          type: "text/javascript",
          src: "https://kit.fontawesome.com/42d5adcbca.js",
          async: true,
        },
        {
          type: "text/javascript",
          src: "https://buttons.github.io/buttons.js",
          async: true,
        },
        {
          type: "text/javascript",
          src: "/_nuxt/assets/js/choices.min.js",
          async: true,
        },
      ],
    },
  },
  components: {
    global: true,
    dirs: ["~/components/Icons", "~/components"],
  },
  imports: {
    autoImport: true,
  },
  css: [
    "@/assets/css/template.css",
    "@/assets/css/nucleo-svg.css",
    "@/assets/css/nucleo-icons.css",
    "@/assets/scss/argon-dashboard.scss",
  ],
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/i18n",
  ],
  i18n: {
    strategy: 'no_prefix',
    langDir: 'locales',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json' },
      { code: 'zh', iso: 'zh-TW', file: 'zh.json' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: "root", // 為了更好的搜尋引擎優化，建議將redirectOn 設定為root。
    }
  },
  runtimeConfig: {
    dburl: process.env.DATABASE_URL,
    dbName: process.env.DBNAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    authSource: process.env.DB_AUTHSOURCE,
  },
});
