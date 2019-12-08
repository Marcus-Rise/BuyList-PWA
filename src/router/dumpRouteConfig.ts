import { RouteConfig } from "vue-router";

const dumpRouteConfig: RouteConfig = {
    path: "/dump",
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
};

export { dumpRouteConfig };
