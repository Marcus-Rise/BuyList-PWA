<template lang="pug">
    v-row
        v-col
            v-form(
                @submit.prevent="match"
                lazy-validation
            )
                v-container
                    v-row
                        v-col(
                            cols="12"
                            sm="4"
                            xs="12"
                        )
                            v-text-field.display-1(
                                v-model="limit"
                                @input="limit = parseFloat(String(limit))"
                                :rules="[v => (!!v && v > 0) || 'Сумма бюджета должна быть больше нуля']"
                                label="Бюджет"
                                type="number"
                                min="1"
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
                                v-card-title Сумма списка: {{ String(newListPrice) | price}}
                                v-card-subtitle(
                                    v-if="newListPriceBenefits > 0"
                                ) Разница в плюс: {{String(newListPriceBenefits) | price}}

                    v-row(v-if="newList && newList.length > 0")
                        v-col
                            slot(name="new-list" :list="newList")

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
        @Prop() products!: Product[];

        get newListPriceBenefits(): number {
            return (this.limit || 0) - this.newListPrice;
        }

        get newListPrice(): number {
            return this.newList?.reduce((sum: number, product: Product) => {
                return sum + product.price;
            }, 0) || 0;
        }

        public newList: Product[] = [];
        public limit: number | null = null;
        private readonly budgetAnalyzerService: IBudgetAnalyzerService = container
            .resolve("IBudgetAnalyzerService");

        match(): void {
            this.newList.splice(0);

            if (this.limit && this.limit > 0 && this.products.length > 0) {
                this.newList = this.budgetAnalyzerService.getBestChoice(
                    this.products,
                    this.limit
                );
            }
        }
    }
</script>
