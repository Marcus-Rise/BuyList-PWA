<template lang="pug">
    v-container(
        v-if="!!productList"
        style="height: 100%"
    )
        v-row
            v-col(sm="12")
                v-card.mx-auto
                    v-toolbar(
                        color="teal"
                        dark
                    )
                        v-toolbar-title Продукты списка "{{ productList.title }}"

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

                    v-card-text
                        list-search-filter-cmpt(
                            v-if="productArray.length > 5"
                            v-model="searchQuery"
                        )

                        v-data-table(
                            :headers="headers"
                            :hide-default-header="productArray.length === 0"
                            :hide-default-footer="productArray.length === 0"
                            :items="filteredProductArray"
                        )
                            template(v-slot:item.action="{ item }")
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
                                        ) Создать продукт
            v-col(
                v-if="productArray.length > 0"
            )
                v-card.mx-auto
                    v-toolbar(
                        color="teal"
                        dark
                    )
                        v-toolbar-title Подобранный список

                    v-card-text
                        budget-analyzer-cmpt(:products="productArray")
                            template(v-slot:new-list = "{ list }")
                                v-data-table(
                                    :headers="headersNewList"
                                    :items="list"
                                )
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { container } from "tsyringe";
    import { Product } from "@/models/Product";
    import { IProductService } from "@/services/IProductService";
    import { ProductList } from "@/models/ProductList";
    import { IProductListService } from "@/services/IProductListService";
    import { NotFoundException } from "@/core/Exception/NotFoundException";
    import BudgetAnalyzerCmpt from "@/components/BudgetAnalyzerCmpt.vue";
    import ListSearchFilterCmpt from "@/components/ListSearchFilterCmpt.vue";

    @Component({
        components: { ListSearchFilterCmpt, BudgetAnalyzerCmpt }
    })
    export default class ProductArrayView extends Vue {
        get filteredProductArray(): Product[] {
            return this.productArray.filter(item =>
                item.title.includes(this.searchQuery ? this.searchQuery : "")
            );
        }

        public searchQuery: string = "";
        public productArray: Product[] = [];
        public productList: ProductList | null = null;
        public readonly headers: Array<{
            text: string,
            value: string,
            align?: "left",
            sortable?: boolean,
        }> = [
            {
                text: "Название",
                value: "title"
            },
            {
                text: "Приоритет",
                value: "priority"
            },
            {
                text: "Цена",
                value: "price"
            },
            { text: "Действия", value: "action", sortable: false }
        ];
        public readonly headersNewList: Array<{
            text: string,
            value: string,
            align?: "left",
            sortable?: boolean,
        }> = [
            {
                text: "Название",
                value: "title"
            },
            {
                text: "Приоритет",
                value: "priority"
            },
            {
                text: "Цена",
                value: "price"
            }
        ];

        private readonly productService: IProductService = container.resolve("IProductService");
        private readonly productListService: IProductListService = container.resolve("IProductListService");

        created() {
            this.productListService.get(parseInt(this.$route.params.productListId)).then(item => {
                this.productList = item;

                this.getAll();
            });
        }

        getAll(): void {
            if (this.productList) {
                this.productService.getByList(this.productList.id).then(items => {
                    this.productArray.length = 0;
                    this.productArray.push(...items);
                });
            }
        }

        addItem(): void {
            this.$router.push({
                name: "addProduct",
                params: {
                    productListId: this.productList ? this.productList.id.toString() : "0"
                }
            });
        }

        editItem(key: string): void {
            this.$router.push({ name: "editProduct", params: { id: key } });
        }

        deleteItem(key: string): void {
            this.productService.get(parseInt(key)).then(item => {
                if (item) {
                    this.productService.delete(item).then(() => {
                        this.getAll();
                    });
                } else {
                    throw new NotFoundException("product by " + key);
                }
            });
        }
    }
</script>
