// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  },
  app: {
    head: {
      title: "Billboard",
      bodyAttrs: { class: "h-full" },
      htmlAttrs: { class: "h-full" },
    },
    rootTag: "body",
  },
});
