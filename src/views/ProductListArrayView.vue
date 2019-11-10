<template lang="pug">
    v-row
        v-col
            v-card.mx-auto
                v-toolbar(
                    color="teal"
                    dark
                )
                    v-toolbar-title Списки

                editable-list-cmpt(
                    :items="productListView"
                    @add="addItem"
                    @edit="editItem"
                )
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ProductList } from "@/models/ProductList";
import { IProductListService } from "@/services/IProductListService";
import { container } from "tsyringe";
import EditableListCmpt from "@/components/EditableListCmpt.vue";
import { IEditableListItem } from "@/components/IEditableListItem";

@Component({
  components: { EditableListCmpt }
})
export default class ProductListArrayView extends Vue {
  get productListView(): IEditableListItem[] {
    return this.productListArray.map(item => {
      return {
        title: item.title,
        key: item.id.toString(),
        secondary: `id: ${item.id}`,
        href: { name: "productList", params: { id: item.id.toString() } }
      };
    });
  }

  public productListArray: ProductList[] = [];

  private readonly productListService: IProductListService = container.resolve(
    "IProductListService"
  );

  created() {
    this.productListService.getAll().then(items => {
      this.productListArray.length = 0;
      this.productListArray.push(...items);
    });
  }

  addItem(): void {
    this.$router.push({ name: "addProductList" });
  }

  editItem(key: string): void {
    this.$router.push({ name: "editProductList", params: { id: key } });
  }
}
</script>
