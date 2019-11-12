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
