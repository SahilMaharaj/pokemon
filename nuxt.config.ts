// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          "Permanent Marker": true,
          Montserrat: [400, 700],
        },
      },
    ],
  ],
});
