import Vue from "vue";
import VueRouter from "vue-router";
import { SRE_TOKEN } from "@/helpers/constants";
import Home from "@/views/Home";
import Login from "@/views/Login";
import Register from "@/views/Register";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },

  {
    path: "/reviews",
    name: "Reviews",
    component: () =>
      import(/* webpackChunkName: "reviews" */ "../views/Reviews.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
  },
  {
    path: "/*",
    name: "PageNotFound",
    component: () =>
      import(
        /* webpackChunkName: "pageNotFound" */ "../views/errors/PageNotFound.vue"
      ),
  },
  {
    path: "/*",
    name: "UserNotFound",
    component: () =>
      import(
        /* webpackChunkName: "userNotFound" */ "../views/errors/UserNotFound.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register", "/home"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem(SRE_TOKEN);

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
