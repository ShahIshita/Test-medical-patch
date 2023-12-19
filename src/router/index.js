// Composables
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/dashboard/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true, roles: ["Doctor", "Customer"] },
  },
  {
    path: "/login",
    name: "userlogin",
    component: () => import("../views/user/UserLogin.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("../views/settings/SettingsView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem("role")) {
      next({
        path: "/login",
      });
    } else if (
      to.meta.roles &&
      !to.meta.roles.includes(localStorage.getItem("role"))
    ) {
      next({ name: "settings" });
    } else {
      next();
    }
  } else if (to.fullPath === "/login" && localStorage.getItem("role")) {
    next({
      path: "/",
    });
  } else {
    next();
  }
});

export default router;
