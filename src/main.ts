import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/axios";
import store from "./store";
import "./style/myIcon.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
