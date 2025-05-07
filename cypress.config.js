import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  e2e: {
 
    baseUrl: 'https://erickwendel.github.io/vanilla-js-web-app-example/',

    //não vai limpar o estado da tela após cada it
    testIsolation: false
  },
});
