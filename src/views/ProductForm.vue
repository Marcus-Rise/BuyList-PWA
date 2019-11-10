<template lang="pug">
    v-row
        v-col
            v-card.mx-auto
                v-toolbar(
                    color="teal"
                    dark
                )
                    v-toolbar-title {{product.title || "Новый продукт"}}

                v-form
                    v-container
                        v-row
                            v-col(
                                cols="12"
                                md="4"
                            )
                                v-text-field(
                                    v-model="product.title"
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
import { container } from "tsyringe";
import { Product } from "@/models/Product";
import { IProductService } from "@/services/IProductService";

@Component
export default class ProductForm extends Vue {
  public product: Product = new Product();

  private readonly productService: IProductService = container.resolve(
    "IProductService"
  );

  created() {
    if (this.$route.params.id) {
      this.productService.get(parseInt(this.$route.params.id)).then(item => {
        this.product = item;
      });
    }
  }

  create(): void {
    this.productService.save(this.product).then(() => {
      this.$router.go(-1);
    });
  }
}
</script>
