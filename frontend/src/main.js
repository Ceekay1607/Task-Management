import { createApp } from "vue";
import App from "./App.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import router from "./router";

createApp(App).use(router).use(VueQueryPlugin).mount("#app");
