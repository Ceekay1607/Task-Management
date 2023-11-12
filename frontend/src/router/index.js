// /router/index.js
import { createWebHistory, createRouter } from "vue-router";
import Login from "../views/Login.vue";
import authService from "@/service/auth.service";

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
        path: "/project/:projectId",
        name: "issues",
        redirect: { name: "board" },
        component: () => import("../views/Issue.vue"),
        children: [
            {
                path: "board",
                name: "board",
                component: () => import("../components/issues/IssueCard.vue"),
            },
            {
                path: "editProject",
                name: "editProject",
                component: () =>
                    import("../components/projects/ProjectEditForm.vue"),
            },
        ],
        props: (route) => ({ projectId: route.params.projectId }),
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
    if (to.meta.requiresAuth && !(await authService.isAuthenticated())) {
        return next({ name: "login" });
    } else {
        return next();
    }
});

export default router;
