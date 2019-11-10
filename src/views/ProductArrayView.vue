<template lang="pug">
    v-row
        v-col
            v-card.mx-auto(v-if="!!productList")
                v-toolbar(
                    color="teal"
                    dark
                )
                    v-toolbar-title Продукты списка {{ productList.title }}

                editable-list-cmpt(
                    :items="productsView"
                    @add="addItem"
                    @edit="editItem"
                )
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { container } from "tsyringe";
    import EditableListCmpt from "@/components/EditableListCmpt.vue";
    import { IEditableListItem } from "@/components/IEditableListItem";
    import { Product } from "@/models/Product";
    import { IProductService } from "@/services/IProductService";
    import { ProductList } from "@/models/ProductList";
    import { IProductListService } from "@/services/IProductListService";

    @Component({
        components: { EditableListCmpt }
    })
    export default class ProductArrayView extends Vue {
        get productsView(): IEditableListItem[] {
            return this.productArray.map(item => {
                return {
                    title: item.title,
                    key: item.id.toString(),
                    secondary: `id: ${item.id}`
                };
            });
        }

        public productArray: Product[] = [];
        public productList: ProductList | null = null;

        private readonly productService: IProductService = container.resolve(
            "IProductService"
        );
        private readonly productListService: IProductListService = container.resolve(
            "IProductListService"
        );

        created() {
            this.productListService.get(parseInt(this.$route.params.id))
                .then((item) => {
                    this.productList = item;
                });

            this.productService.getAll().then(items => {
                this.productArray.push(...items);
            });
        }

        addItem(): void {
            this.$router.push({
                name: "addProduct",
                params: {
                    productListId: this.productList
                        ? this.productList.id.toString()
                        : "0"
                }
            });
        }

        editItem(key: string): void {
            this.$router.push({ name: "editProduct", params: { id: key } });
        }
    }
</script>
