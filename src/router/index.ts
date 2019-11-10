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
    name: "addProductList",
    component: () =>
      import(
        /* webpackChunkName: "addProductList" */ "@/views/ProductListForm.vue"
      )
  },
  {
    path: "/edit-product-list/:id",
    name: "editProductList",
    component: () =>
      import(
        /* webpackChunkName: "addProductList" */ "@/views/ProductListForm.vue"
      )
  },
  {
    path: "/add-product",
    name: "addProduct",
    component: () =>
      import(/* webpackChunkName: "addProduct" */ "@/views/ProductForm.vue")
  },
  {
    path: "/edit-product/:id",
    name: "editProduct",
    component: () =>
      import(/* webpackChunkName: "addProduct" */ "@/views/ProductForm.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
