import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { createApp } from "vue";
import App from "./App.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import router from "./router";
import "@fortawesome/fontawesome-free/css/all.css";

createApp(App).use(router).use(VueQueryPlugin).mount("#app");
