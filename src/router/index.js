import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/dashboard/HomeView.vue";
import NotFound from "../views/dashboard/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true, roles: ["Doctor", "Customer"] },
  },
  {
    path: "/patient-details/:id",
    name: "patient-details",
    component: () => import("../views/dashboard/PatientDetails.vue"),
    meta: { requiresAuth: true, roles: ["Doctor"] },
  },
  {
    path: "/login",
    name: "userlogin",
    component: () => import("../views/user/UserLogin.vue"),
  },
  {
    path: "/user-management",
    name: "usermanagement",
    component: () => import("../views/userManagement/UserManagement.vue"),
    meta: { requiresAuth: true, roles: ["Doctor"] },
  },
  {
    path: "/devices",
    name: "devices",
    component: () => import("../views/admin/DeviceList.vue"),
    meta: { requiresAuth: true, roles: ["Admin"] },
  },
  {
    path: "/patients",
    name: "patients",
    component: () => import("../views/patients/PatientsData.vue"),
    meta: { requiresAuth: true, roles: ["Doctor"] },
  },
  {
    path: "/add-new-patient",
    name: "add-patient",
    component: () => import("../views/patients/AddPatient.vue"),
    meta: { requiresAuth: true, roles: ["Doctor"] },
  },
  {
    path: "/patients/patient/:id",
    name: "patient-profile",
    component: () => import("../views/patients/PatientProfile.vue"),
    meta: { requiresAuth: true, roles: ["Doctor", "Customer"] },
  },
  {
    path: "/doctors/:id",
    name: "doctor-profile",
    component: () => import("../views/patients/PatientProfile.vue"),
    meta: { requiresAuth: true, roles: ["Admin"] },
  },
  {
    path: "/edit-patient/:id",
    name: "edit-patient",
    component: () => import("../views/patients/EditPatient.vue"),
    meta: { requiresAuth: true, roles: ["Doctor", "Customer"] },
  },
  {
    path: "/live-device",
    name: "live-device",
    component: () => import("../views/live/LivePage.vue"),
    meta: { requiresAuth: true, roles: ["Doctor"] },
  },
  {
    path: "/doctors",
    name: "doctors",
    component: () => import("../views/admin/DoctorData.vue"),
    meta: { requiresAuth: true, roles: ["Admin"] },
  },
  {
    path: "/add-doctor",
    name: "add-doctor",
    component: () => import("../views/admin/AddDoctor.vue"),
    meta: { requiresAuth: true, roles: ["Admin"] },
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("../views/settings/SettingsView.vue"),
  },
   { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
  { path: "/:pathMatch(.*)", name: "bad-not-found", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "exactActiveLink",
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
