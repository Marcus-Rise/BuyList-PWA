<template lang="pug">
    div
        v-app-bar
            v-app-bar-nav-icon(@click="showMenu = true")
            v-toolbar-title BuyList
            v-spacer

            v-menu(
                left
                bottom
            )
                template( v-slot:activator="{ on }")
                    v-btn(icon v-on="on")
                        v-icon fa-ellipsis-v

                v-list
                    v-list-item(
                        link
                        :to="{ name: \"dumpExport\" }"
                    )
                        v-list-item-title Экспорт данных
                    v-list-item(
                        link
                        :to="{ name: \"dumpImport\" }"
                    )
                        v-list-item-title Импорт данных
                    v-list-item(
                        link
                        :to="{ name: \"dumpClear\" }"
                    )
                        v-list-item-title Очистить данные

        v-navigation-drawer(
            v-model="showMenu"
            absolute
            temporary
            dark
        )
            v-list-item
                v-list-item-content BuyList

            v-divider

            v-list(dense)
                v-list-item(link :to="{ name: 'productListArray' }" exact)
                    v-list-item-icon
                        v-icon fa-list-ul
                    v-list-item-content Все списки
                v-list-item(
                    v-for="item of productListArray"
                    link
                    :to="{ name: 'productList', params: { id: item.id.toString() } }"
                )
                    v-list-item-icon
                        v-icon fa-list-ul
                    v-list-item-content Список "{{item.title}}"
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { IProductListService } from "@/services/IProductListService";
    import { container } from "tsyringe";
    import { ProductList } from "@/models/ProductList";

    @Component
    export default class HeaderCmpt extends Vue {
        public showMenu: boolean = false;
        public productListArray: ProductList[] = [];

        private readonly productListService: IProductListService = container.resolve(
            "IProductListService"
        );

        async created() {
            this.productListArray = await this.productListService.getAll();
        }

        storageDumpImport(): void {
            this.$router.push({ name: "dumpImport" });
        }

        storageDumpExport(): void {
            this.$router.push({ name: "dumpExport" });
        }

        storageDumpClear(): void {
            this.$router.push({ name: "dumpClear" });
        }
    }
</script>
