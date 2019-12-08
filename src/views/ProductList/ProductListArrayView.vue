<template lang="pug">
    v-container(style="height: 100%")
        v-row
            v-col
                v-card.mx-auto
                    v-toolbar(
                        v-if="productListArray.length !== 0"
                        color="teal"
                        dark
                    )
                        v-toolbar-title Списки

                        v-spacer

                        v-btn(
                            fab
                            color="accent"
                            small
                            @click="addItem"
                        )
                            v-icon(
                                small
                            ) fa-plus

                    list-search-filter-cmpt(
                        v-if="productListArray.length > 5"
                        v-model="searchQuery"
                    )

                    v-data-table(
                        :headers="headers"
                        :hide-default-header="productListArray.length === 0"
                        :hide-default-footer="productListArray.length === 0"
                        :items="filteredProductListArray"
                    )
                        template(v-slot:item.action="{ item }")
                            router-link(
                                :to="{ name: 'productArray', params: {productListId: item.id.toString()} }"
                                style="text-decoration: none"
                            )
                                v-icon.mr-6(
                                    small
                                    @click="editItem(item.id)"
                                ) fa-list

                            v-icon.mr-6(
                                small
                                @click="editItem(item.id)"
                            ) fa-pen

                            v-icon.mr-2(
                                small
                                @click="deleteItem(item.id)"
                            ) fa-trash

                        template(v-slot:no-data)
                            v-col
                                v-card-text
                                    p.display-1.text--primary(align="center") Вперед!

                                v-card-actions
                                    v-btn(
                                        block
                                        x-large
                                        color="accent"
                                        @click="addItem"
                                    ) Создать список

</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { ProductList } from "@/models/ProductList";
    import { IProductListService } from "@/services/IProductListService";
    import { container } from "tsyringe";
    import EditableListCmpt from "@/components/EditableListCmpt.vue";
    import { NotFoundException } from "@/core/Exception/NotFoundException";
    import ListSearchFilterCmpt from "@/components/ListSearchFilterCmpt.vue";
    import { IProductService } from "@/services/IProductService";

    @Component({
        components: { ListSearchFilterCmpt, EditableListCmpt }
    })
    export default class ProductListArrayView extends Vue {
        get filteredProductListArray(): ProductList[] {
            return this.productListArray.filter(item => item.title.includes(this.searchQuery || ""));
        }

        public searchQuery: string = "";
        public productListArray: ProductList[] = [];
        public readonly headers: Array<{
            text: string,
            value: string,
            align?: "left",
            sortable?: boolean,
        }> = [
            {
                text: "Название",
                value: "title"
            }, {
                text: "Количество продуктов",
                value: "productsCount"
            },
            { text: "", value: "action", sortable: false }
        ];

        private readonly productListService: IProductListService = container.resolve("IProductListService");
        private readonly productService: IProductService = container.resolve("IProductService");

        created() {
            this.getAll();
        }

        async getAll(): Promise<void> {
            this.productListService.getAll().then(items => {
                for (const item of items) {
                    this.productService.getByList(item.id).then(products => {
                        item.productsCount = products.length;
                    });
                }

                this.productListArray.length = 0;
                this.productListArray.push(...items);
            });
        }

        addItem(): void {
            this.$router.push({ name: "addProductList" });
        }

        editItem(key: string): void {
            this.$router.push({ name: "editProductList", params: { id: key } });
        }

        deleteItem(key: string): void {
            this.productListService.get(parseInt(key)).then(item => {
                if (item) {
                    this.productListService.delete(item).then(() => {
                        this.getAll();
                    });
                } else {
                    throw new NotFoundException("product list by " + key);
                }
            });
        }
    }
</script>
