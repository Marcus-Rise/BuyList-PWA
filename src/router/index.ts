import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "productListArray",
    component: () =>
      import(
        /* webpackChunkName: "productListArray" */ "@/views/ProductListArrayView.vue"
      )
  },
  {
    path: "/add-product-list",
    name: "addProductLst",
    component: () =>
      import(
        /* webpackChunkName: "addProductLst" */ "@/views/ProductListForm.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
