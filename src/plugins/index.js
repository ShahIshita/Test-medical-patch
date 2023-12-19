/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from "./vuetify";
import router from "../router";
import VueTelInput from "vue3-tel-input";
import Toast from "vue3-toastify";
import VueApexCharts from "vue3-apexcharts";
import "vue3-tel-input/dist/vue3-tel-input.css";
import store from "../store";

export function registerPlugins(app) {
  app
    .use(vuetify)
    .use(router)
    .use(VueTelInput)
    .use(Toast)
    .use(VueApexCharts)
    .use(store);
}
