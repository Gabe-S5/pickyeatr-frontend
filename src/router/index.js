import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
// import store from "@/store";

// function requireLogin(to, from, next) {
//   if (store.getters.token === "") {
//     next({
//       path: "/login",
//     });
//   } else {
//     next();
//   }
// }

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        // beforeEnter: requireLogin,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
