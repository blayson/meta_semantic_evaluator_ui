import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/Home",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
