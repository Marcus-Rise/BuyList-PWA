<template lang="pug">
    v-row
        v-col
            v-form(@submit.prevent="match")
                v-container
                    v-row
                        v-col(
                            cols="12"
                            sm="4"
                            xs="12"
                        )
                            v-text-field.display-1(
                                v-model="limit"
                                @change="limit = parseFloat(limit)"
                                label="Бюджет"
                                type="number"
                                min="1"
                                required
                                outlined
                                prepend-icon="fa-ruble-sign"
                            )
                        v-col(
                            cols="12"
                            sm="3"
                            xs="12"
                        )
                            v-btn.title(
                                type="submit"
                                color="primary"
                                block
                                x-large
                            ) Подобрать
                    v-row(v-if="newListPrice > 0")
                        v-col
                            v-card(
                                outlined
                            )
                                v-card-title Сумма списка: {{ newListPrice | price}}
                                v-card-subtitle(
                                    v-if="newListPriceBenefits > 0"
                                ) Разница в плюс: {{newListPriceBenefits | price}}

                    v-row(v-if="newList")
                        v-list
                            v-list-item(v-for="item of newList" :key="item.key")
                                v-list-item-content
                                    v-list-item-title {{item.title}}
                                    v-list-item-subtitle {{item.toString()}}

</template>

<script lang="ts">
    import { Component, Prop, Vue } from "vue-property-decorator";
    import { container } from "tsyringe";
    import { Product } from "@/models/Product";
    import { IBudgetAnalyzerService } from "@/services/IBudgetAnalyzerService";

    @Component({
        filters: {
            price: (value: string) => `₽ ${parseFloat(value).toFixed(2)}`
        }
    })
    export default class BudgetAnalyzerCmpt extends Vue {
        @Prop({ type: Array, required: true }) products!: Product[];

        public limit: number = 0;

        public newList: Product[] = [];

        get newListPriceBenefits(): number {
            return this.limit - this.newListPrice;
        }

        get newListPrice(): number {
            return this.newList
                ? this.newList.reduce((sum: number, product: Product) => {
                    return sum + product.price;
                }, 0)
                : 0;
        }

        private readonly budgetAnalyzerService: IBudgetAnalyzerService = container.resolve(
            "IBudgetAnalyzerService"
        );

        match(): void {
            this.newList.length = 0;

            if (this.limit > 0 && this.products.length > 0) {
                this.newList = this.budgetAnalyzerService.getBestChoice(
                    this.products,
                    this.limit
                );
            }
        }
    }
</script>
