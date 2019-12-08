import { RouteConfig } from "vue-router";

const productListRouteConfig: RouteConfig = {
    path: "/productList",
    component: () =>
        import(
            /* webpackChunkName: "productList" */ "@/views/ProductList/ProductListView.vue"
            ),
    children: [
        {
            path: "",
            name: "productListArray",
            component: () =>
                import(
                    /* webpackChunkName: "productListArray" */ "@/views/ProductList/ProductListArrayView.vue"
                    )
        },
        {
            path: ":productListId",
            redirect: { name: "productArray" }
        },
        {
            path: "add",
            name: "addProductList",
            component: () =>
                import(
                    /* webpackChunkName: "addProductList" */ "@/views/ProductList/ProductListForm.vue"
                    )
        },
        {
            path: "edit/:id",
            name: "editProductList",
            component: () =>
                import(
                    /* webpackChunkName: "editProductList" */ "@/views/ProductList/ProductListForm.vue"
                    )
        }
    ]
};

export { productListRouteConfig };
