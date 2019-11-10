<template lang="pug">
    v-row
        v-col
            v-card.mx-auto
                v-toolbar(
                    color="teal"
                    dark
                )
                    v-toolbar-title {{productList.title || "Новый список"}}

                v-form
                    v-container
                        v-row
                            v-col(
                                cols="12"
                                md="4"
                            )
                                v-text-field(
                                    v-model="productList.title"
                                    label="Заголовок"
                                    required
                                )
                        v-row
                            v-col(
                                cols="12"
                                md="4"
                            )
                                v-btn(@click="create()" color="primary") Сохранить


</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ProductList } from "@/models/ProductList";
import { IProductListService } from "@/services/IProductListService";
import { container } from "tsyringe";

@Component
export default class ProductListForm extends Vue {
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
    this.productListService.save(this.productList).then(() => {
      this.$router.go(-1);
    });
  }
}
</script>
