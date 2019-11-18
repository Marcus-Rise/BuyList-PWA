<template lang="pug">
    v-row(v-if="!!productList")
        v-col(sm="12")
            v-card.mx-auto
                v-toolbar(
                    color="teal"
                    dark
                )
                    v-toolbar-title Продукты списка "{{ productList.title }}"

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

                v-card-text
                    list-search-filter-cmpt(
                        v-if="productArray.length > 5"
                        v-model="searchQuery"
                    )

                    editable-list-cmpt(
                        :items="productsView"
                        @edit="editItem"
                        @delete="deleteItem"
                    )
        v-col(sm="12")
            v-card.mx-auto
                v-toolbar(
                    color="teal"
                    dark
                )
                    v-toolbar-title Подобранный список

                v-card-text
                    budget-analyzer-cmpt(:products="productArray")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { container } from "tsyringe";
import EditableListCmpt from "@/components/EditableListCmpt.vue";
import { IEditableListItem } from "@/components/IEditableListItem";
import { Product } from "@/models/Product";
import { IProductService } from "@/services/IProductService";
import { ProductList } from "@/models/ProductList";
import { IProductListService } from "@/services/IProductListService";
import { NotFoundException } from "@/core/Exception/NotFoundException";
import BudgetAnalyzerCmpt from "@/components/BudgetAnalyzerCmpt.vue";
import ListSearchFilterCmpt from "@/components/ListSearchFilterCmpt.vue";

@Component({
  components: { ListSearchFilterCmpt, BudgetAnalyzerCmpt, EditableListCmpt }
})
export default class ProductArrayView extends Vue {
  get productsView(): IEditableListItem[] {
    return this.filteredProductArray.map(item => {
      return {
        title: item.title,
        key: item.id.toString(),
        secondary: item.toString()
      };
    });
  }

  get filteredProductArray(): Product[] {
    return this.productArray.filter(item =>
      item.title.includes(this.searchQuery ? this.searchQuery : "")
    );
  }

  public searchQuery: string = "";
  public productArray: Product[] = [];
  public productList: ProductList | null = null;

  private readonly productService: IProductService = container.resolve(
    "IProductService"
  );
  private readonly productListService: IProductListService = container.resolve(
    "IProductListService"
  );

  created() {
    this.productListService.get(parseInt(this.$route.params.id)).then(item => {
      this.productList = item;

      this.getAll();
    });
  }

  getAll(): void {
    if (this.productList) {
      this.productService.getByList(this.productList.id).then(items => {
        this.productArray.length = 0;
        this.productArray.push(...items);
      });
    }
  }

  addItem(): void {
    this.$router.push({
      name: "addProduct",
      params: {
        productListId: this.productList ? this.productList.id.toString() : "0"
      }
    });
  }

  editItem(key: string): void {
    this.$router.push({ name: "editProduct", params: { id: key } });
  }

  deleteItem(key: string): void {
    this.productService.get(parseInt(key)).then(item => {
      if (item) {
        this.productService.delete(item).then(() => {
          this.getAll();
        });
      } else {
        throw new NotFoundException("product by " + key);
      }
    });
  }
}
</script>
