import { createRouter, createWebHistory } from "vue-router";
import { supabaseClient } from "./supabaseClient.ts";
export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: () => import("./pages/Home.vue"),
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/login",
            component: () => import("./pages/Login.vue"),
            meta: {
                requiresAuth: false,
            }
        },
        {
            path: "/register",
            component: () => import("./pages/Register.vue"),
            meta: {
                requiresAuth: false,
            }
        },
    ],
})

router.beforeEach(async (to, from, next) => {
    const { data: { user } } = await supabaseClient.auth.getUser()

    if (to.meta.requiresAuth && !user) {
        next('/login'); // Redirect to the login page
    } else {
        next(); // Continue navigation
    }
});
