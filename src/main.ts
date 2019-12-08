import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import VueScrollTo from "vue-scrollto";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

Vue.use(Vuetify);
Vue.use(VueScrollTo);

library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
