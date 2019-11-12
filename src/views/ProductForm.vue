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
                            v-col(
                                cols="12"
                                md="4"
                            )
                                v-text-field(
                                    type="number"
                                    min="0"
                                    v-model="product.priority"
                                    label="Приоритет"
                                    required
                                )
                            v-col(
                                cols="12"
                                md="4"
                            )
                                v-text-field(
                                    type="number"
                                    v-model="product.price"
                                    min="1"
                                    label="Цена"
                                    required
                                )
                        v-row
                            v-col(
                                cols="12"
                                md="4"
                            )
                                v-btn(@click="create()" color="primary") Сохранить
                            v-col(
                                cols="12"
                                md="4"
                                v-if="isEdit"
                            )
                                v-btn(@click="deleteItem()" color="accent") Удалить


</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { container } from "tsyringe";
import { Product } from "@/models/Product";
import { IProductService } from "@/services/IProductService";

@Component
export default class ProductForm extends Vue {
  get isEdit(): boolean {
    return this.product.id !== new Product().id;
  }

  public product: Product = new Product();

  private readonly productService: IProductService = container.resolve(
    "IProductService"
  );

  mounted() {
    if (this.$route.params.id !== undefined) {
      this.productService.get(parseInt(this.$route.params.id)).then(item => {
        this.product = item;
      });
    }

    if (this.$route.params.productListId !== undefined) {
      this.product.productListId = parseInt(this.$route.params.productListId);
    }
  }

  create(): void {
    if (this.isEdit) {
      this.productService.update(this.product).then(() => {
        this.routerBack();
      });
    } else {
      this.productService.save(this.product).then(() => {
        this.routerBack();
      });
    }
  }

  deleteItem(): void {
    this.productService.delete(this.product).then(() => {
      this.$router.go(-1);
    });
  }

  routerBack(): void {
    this.$router.go(-1);
  }
}
</script>
