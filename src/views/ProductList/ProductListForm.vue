<template lang="pug">
    v-container
        v-row
            v-col
                v-card.mx-auto
                    v-toolbar(
                        color="teal"
                        dark
                    )
                        v-toolbar-title {{productList.title ? `Список "${productList.title}"` : "Новый список"}}

                    v-form(
                        @submit.prevent="create"
                    )
                        v-container
                            v-row
                                v-col(
                                    cols="12"
                                )
                                    v-text-field(
                                        v-model="productList.title"
                                        label="Заголовок"
                                        :error-messages="productList.errors.title"
                                        @input="productList.errors.title = []"
                                        solo
                                    )
                            v-row
                                v-col(
                                    cols="12"
                                    xsm="12"
                                    sm="4"
                                )
                                    v-btn(
                                        type="submit"
                                        color="primary"
                                        large
                                        block
                                    ) Сохранить
                                v-col(
                                    v-if="isEdit"
                                    cols="12"
                                    xsm="12"
                                    sm="4"
                                )
                                    v-btn(
                                        @click="deleteItem()"
                                        color="accent"
                                        large
                                        block
                                    ) Удалить

</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { ProductList } from "@/models/ProductList";
    import { IProductListService } from "@/services/IProductListService";
    import { container } from "tsyringe";
    import { ProductListDTO } from "@/models/ProductListDTO";

    @Component
    export default class ProductListForm extends Vue {
        get isEdit(): boolean {
            return this.productList.id !== new ProductList().id;
        }

        public productList: ProductList = new ProductList();

        private readonly productListService: IProductListService = container.resolve(
            "IProductListService"
        );

        created() {
            if (this.$route.params.id !== undefined) {
                this.productListService
                    .get(parseInt(this.$route.params.id))
                    .then(item => {
                        this.productList = item;
                    });
            }
        }

        create(): void {
            if (this.validate()) {
                if (this.isEdit) {
                    this.productListService.update(this.productList).then(() => {
                        this.routerBack();
                    });
                } else {
                    this.productListService.save(this.productList).then(() => {
                        this.routerBack();
                    })
                        .catch((e) => {
                            console.error(e);
                        });
                }
            }
        }

        deleteItem(): void {
            this.productListService.delete(this.productList);
        }

        routerBack(): void {
            this.$router.go(-1);
        }

        validate(): boolean {
            this.productList.clear();

            return new ProductListDTO(this.productList).validate();
        }
    }
</script>
