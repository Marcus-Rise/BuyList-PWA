<template lang="pug">
    v-container(style="height: 100%")
        v-row(
            v-if="productListArray.length === 0"
            style="height: 90%"
            justify="center"
            align="center"
        )
            v-col
                v-card.mx-auto(
                    max-width="344"
                    outlined
                )
                    v-card-text
                        p.display-1.text--primary(align="center") Вперед!

                    v-card-actions
                        v-btn(
                            block
                            x-large
                            color="accent"
                            @click="addItem"
                        ) Создать список
        v-row(v-if="productListArray.length > 0")
            v-col
                v-card.mx-auto
                    v-toolbar(
                        color="teal"
                        dark
                    )
                        v-toolbar-title Списки

                        v-spacer

                        v-btn(
                            fab
                            color="accent"
                            small
                            @click="addItem"
                        )
                            v-icon(
                                small
                            ) fa-plus

                    list-search-filter-cmpt(
                        v-if="productListArray.length > 5"
                        v-model="searchQuery"
                    )

                    editable-list-cmpt(
                        :items="productListView"
                        @edit="editItem"
                        @delete="deleteItem"
                    )
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ProductList } from "@/models/ProductList";
import { IProductListService } from "@/services/IProductListService";
import { container } from "tsyringe";
import EditableListCmpt from "@/components/EditableListCmpt.vue";
import { IEditableListItem } from "@/components/IEditableListItem";
import { NotFoundException } from "@/core/Exception/NotFoundException";
import ListSearchFilterCmpt from "@/components/ListSearchFilterCmpt.vue";
import { IProductService } from "@/services/IProductService";

@Component({
  components: { ListSearchFilterCmpt, EditableListCmpt }
})
export default class ProductListArrayView extends Vue {
  get productListView(): IEditableListItem[] {
    return this.filteredProductListArray.map(item => {
      return {
        title: item.title,
        key: item.id.toString(),
        secondary: item.toStringFormatted(),
        href: { name: "productList", params: { id: item.id.toString() } }
      };
    });
  }

  get filteredProductListArray(): ProductList[] {
    return this.productListArray.filter(item =>
      item.title.includes(this.searchQuery ? this.searchQuery : "")
    );
  }

  public searchQuery: string = "";
  public productListArray: ProductList[] = [];

  private readonly productListService: IProductListService = container.resolve(
    "IProductListService"
  );
  private readonly productService: IProductService = container.resolve(
    "IProductService"
  );

  created() {
    this.getAll();
  }

  async getAll(): Promise<void> {
    this.productListService.getAll().then(items => {
      for (const item of items) {
        this.productService.getByList(item.id).then(products => {
          item.productsCount = products.length;
        });
      }

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

  deleteItem(key: string): void {
    this.productListService.get(parseInt(key)).then(item => {
      if (item) {
        this.productListService.delete(item).then(() => {
          this.getAll();
        });
      } else {
        throw new NotFoundException("product list by " + key);
      }
    });
  }
}
</script>
