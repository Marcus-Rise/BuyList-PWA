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
        /* webpackChunkName: "editProductList" */ "@/views/ProductListForm.vue"
      )
  },
  {
    path: "/product-list/:id",
    name: "productList",
    component: () =>
      import(
        /* webpackChunkName: "productList" */ "@/views/ProductArrayView.vue"
      )
  },
  {
    path: "/add-product/:productListId",
    name: "addProduct",
    component: () =>
      import(/* webpackChunkName: "addProduct" */ "@/views/ProductForm.vue")
  },
  {
    path: "/edit-product/:id",
    name: "editProduct",
    component: () =>
      import(/* webpackChunkName: "editProduct" */ "@/views/ProductForm.vue")
  },
  {
    path: "/dump",
    name: "dump",
    component: () =>
      import(/* webpackChunkName: "dump" */ "@/views/Dump/DumpView.vue"),
    children: [
      {
        path: "import",
        name: "dumpImport",
        component: () =>
          import(
            /* webpackChunkName: "dumpImport" */ "@/views/Dump/DumpImportView.vue"
          )
      },
      {
        path: "export",
        name: "dumpExport",
        component: () =>
          import(
            /* webpackChunkName: "dumpExport" */ "@/views/Dump/DumpExportView.vue"
          )
      },
      {
        path: "clear",
        name: "dumpClear",
        component: () =>
          import(
            /* webpackChunkName: "dumpClear" */ "@/views/Dump/DumpClearView.vue"
          )
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
