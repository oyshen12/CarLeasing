import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "@/assets/main.scss";
import VueEllipseProgress from "vue-ellipse-progress";

Vue.use(VueEllipseProgress);
Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
