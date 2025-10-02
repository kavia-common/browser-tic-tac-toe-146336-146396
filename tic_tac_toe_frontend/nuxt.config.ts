/**
 * Nuxt configuration for Tic Tac Toe Frontend
 * - App-level metadata, dev server binding, and permissive headers for preview environments.
 */
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Tic Tac Toe — Ocean Professional',
      meta: [
        { name: 'description', content: 'Play a clean, modern Tic Tac Toe game in your browser. Local 2-player with smooth UX.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#2563EB' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22 fill=%22%232563EB%22/><text x=%225.8%22 y=%2216.5%22 font-size=%2211%22 font-family=%22Arial%22 fill=%22white%22>X</text></svg>' }
      ]
    },
  },
  nitro: {
    routeRules: {
      "/**": {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      port: 3000,
    },
  },
});
