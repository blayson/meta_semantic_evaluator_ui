import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import { TokenService } from "@/services/token.service";
import { http } from "@/utils/http-common";

Vue.config.productionTip = false;

Vue.prototype.$http = http;

export const tokenManager = new TokenService();
tokenManager.renew();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
