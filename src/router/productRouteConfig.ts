import { RouteConfig } from "vue-router";

const productRouteConfig: RouteConfig = {
    path: "/product",
    component: () =>
        import(
            /* webpackChunkName: "product" */ "@/views/Product/ProductView.vue"
            ),
    children: [
        {
            path: ":productListId",
            name: "productArray",
            component: () =>
                import(
                    /* webpackChunkName: "productArray" */ "@/views/Product/ProductArrayView.vue"
                    )
        },
        {
            path: ":productListId/add",
            name: "addProduct",
            component: () =>
                import(/* webpackChunkName: "addProduct" */ "@/views/Product/ProductForm.vue")
        },
        {
            path: "edit/:id",
            name: "editProduct",
            component: () =>
                import(/* webpackChunkName: "editProduct" */ "@/views/Product/ProductForm.vue")
        }
    ]
};

export { productRouteConfig };
