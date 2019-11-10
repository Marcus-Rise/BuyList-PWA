<template lang="pug">
    v-row
        v-col
            v-card.mx-auto
                v-toolbar(
                    color="teal"
                    dark
                )
                    v-toolbar-title Продукты

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

  private readonly productService: IProductService = container.resolve(
    "IProductService"
  );

  created() {
    this.productService.getAll().then(items => {
      this.productArray.push(...items);
    });
  }

  addItem(): void {
    this.$router.push({ name: "addProduct" });
  }

  editItem(key: string): void {
    this.$router.push({ name: "editProduct", params: { id: key } });
  }
}
</script>
