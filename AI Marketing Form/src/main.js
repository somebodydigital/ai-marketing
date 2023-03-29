import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Dashboard from "@/views/Dashboard.vue";
import Onboarding from "@/views/Onboarding.vue";
import Database from "@/views/Database.vue";

import "./assets/main.css";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Dashboard",
            component: Dashboard,
        },
        {
            path: "/onboarding",
            name: "Onboarding",
            component: Onboarding,
        },
        {
            path: "/database",
            name: "Database",
            component: Database,
        },
    ],
});

createApp(App).use(router).mount("#app");
