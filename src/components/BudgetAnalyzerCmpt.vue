<template lang="pug">
    v-row
        v-col
            v-form
                v-container
                    v-row
                        v-col(
                            cols="12"
                            md="4"
                        )
                            v-text-field(
                                v-model="limit"
                                label="Бюджет"
                                type="number"
                                min="1"
                                required
                            )
                        v-col(
                            cols="12"
                            md="4"
                        )
                            v-btn(color="primary" @click="match") Подобрать

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

  private readonly budgetAnalyzerService: IBudgetAnalyzerService = container.resolve(
    "IBudgetAnalyzerService"
  );

  match(): void {
    if (this.limit > 0 && this.products.length > 0) {
      console.log(
        this.budgetAnalyzerService.getBestChoice(this.products, this.limit).map(item => item.toString())
      );
    }
  }
}
</script>
