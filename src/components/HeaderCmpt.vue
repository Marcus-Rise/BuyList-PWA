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
                    :to="{ name: 'productArray', params: { productListId: item.id.toString() } }"
                )
                    v-list-item-icon
                        v-icon fa-list-ul
                    v-list-item-content Список "{{item.title}}"
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { container } from "tsyringe";
    import { ProductList } from "@/models/ProductList";
    import { IProductListStoreService } from "@/services/IProductListStoreService";

    @Component
    export default class HeaderCmpt extends Vue {
        get productListArray(): ProductList[] {
            return this.productListStoreService.productListArray;
        }

        public showMenu: boolean = false;
        private readonly productListStoreService: IProductListStoreService = container.resolve("IProductListStoreService");

        created() {
            this.productListStoreService.updateAll();
        }
    }
</script>
