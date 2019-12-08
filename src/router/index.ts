import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { productListRouteConfig } from "@/router/productListRouteConfig";
import { productRouteConfig } from "@/router/productRouteConfig";
import { dumpRouteConfig } from "@/router/dumpRouteConfig";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        path: "/",
        name: "home",
        redirect: { name: "productListArray" }
    },
    productListRouteConfig,
    productRouteConfig,
    dumpRouteConfig,
    {
        path: "/changelog",
        name: "changelog",
        component: () => import(/* webpackChunkName: "changelog" */ "@/views/ChangeLogView.vue")
    },
    {
        path: "*",
        component: () =>
            import(/* webpackChunkName: "error404" */ "@/views/ErrorNotFoundView.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
