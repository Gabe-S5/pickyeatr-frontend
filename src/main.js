import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import store from "./store";

createApp(App)
  .use(store)
  .use(VueAxios, axios)
  .use(Quasar, quasarUserOptions)
  .use(router)
  .mount("#app");
