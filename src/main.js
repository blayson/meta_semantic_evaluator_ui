import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import { TokenServiceOld } from "@/services/token.service";
// import { http } from "@/helpers/http-common";
import setupInterceptors from "@/services/setupInterceptors";

Vue.config.productionTip = false;

// Vue.prototype.$http = http;

export const tokenManager = new TokenServiceOld();
tokenManager.renew();

setupInterceptors(store);

// Vue.use(VeeValidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
