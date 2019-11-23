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
                                label="Бюджет"
                                type="number"
                                min="1"
                                required
                                outlined
                                prepend-icon="fa-wallet"
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

    @Component
    export default class BudgetAnalyzerCmpt extends Vue {
        @Prop({ type: Array, required: true }) products!: Product[];

        public limit: number = 0;

        public newList: Product[] = [];

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
