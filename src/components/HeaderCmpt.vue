<template lang="pug">
    div
        v-app-bar
            v-toolbar-title BuyList

            v-spacer

            theme-switcher

            v-spacer

            v-app-bar-nav-icon(@click="showMenu = true")

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
                v-list-item(link :to="{ name: 'changelog' }")
                    v-list-item-icon
                        v-icon fa-newspaper
                    v-list-item-content Что нового
                v-list-item(link :to="{ name: 'readme' }")
                    v-list-item-icon
                        v-icon fa-question-circle
                    v-list-item-content О программе
                v-list-item(link :to="{ name: 'dumpExport' }")
                    v-list-item-icon
                        v-icon fa-file-export
                    v-list-item-content Экпорт данных
                v-list-item(link :to="{ name: 'dumpImport' }")
                    v-list-item-icon
                        v-icon fa-file-import
                    v-list-item-content Импорт данных
                v-list-item(link :to="{ name: 'dumpClear' }")
                    v-list-item-icon
                        v-icon fa-trash
                    v-list-item-content Стереть данные

</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { container } from "tsyringe";
    import { ProductList } from "@/models/ProductList";
    import { IProductListStoreService } from "@/services/IProductListStoreService";
    import ThemeSwitcher from "@/components/ThemeSwitcher.vue";

    @Component({
        components: { ThemeSwitcher }
    })
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
