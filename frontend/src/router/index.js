// /router/index.js
import { createWebHistory, createRouter } from "vue-router";
import Login from "../views/Login.vue";
import loginService from "@/service/auth.service";

const routes = [
    {
        path: "/",
        name: "project",
        component: () => import("../views/Project.vue"),
        // Thêm navigation guard dưới đây
        meta: { requiresAuth: true },
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../views/Register.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("../views/NotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// navigation guard
router.beforeEach(async (to, from, next) => {
    // redirect to login page if it is not authenticated
    if (to.meta.requiresAuth && !(await loginService.isAuthenticated())) {
        next({ name: "login" });
    } else {
        next();
    }
});

export default router;
