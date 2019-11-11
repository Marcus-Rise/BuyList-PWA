<template lang="pug">
    div
        v-app-bar
            v-app-bar-nav-icon(@click="showMenu = true")
            v-toolbar-title BuyList
            v-spacer

            v-menu(
                left
                bottom
            )
                template( v-slot:activator="{ on }")
                    v-btn(icon v-on="on")
                        v-icon fa-ellipsis-v

                v-list
                    v-list-item(link)
                        v-list-item-title(
                            @click="storageDumpExport()"
                        ) Экспорт данных
                    v-list-item(link)
                        v-list-item-title(
                            @click="storageDumpImport()"
                        ) Импорт данных
                    v-list-item(link)
                        v-list-item-title(
                            @click="storageDumpClear()"
                        ) Очистить данные

        v-navigation-drawer(
            v-model="showMenu"
            absolute
            temporary
            dark
        )
            v-list-item
                v-list-item-avatar
                    v-img(src="https://randomuser.me/api/portraits/men/78.jpg")
                v-list-item-content BuyList

            v-divider

            v-list(dense)
                v-list-item(link :to="{ name: 'productListArray' }")
                    v-list-item-icon
                        v-icon fa-list-ul
                    v-list-item-content Списки продуктов
        v-overlay(:value="showOverlay")
            component(v-if="storageDumpCmpt" :is="storageDumpCmpt")

            v-row(justify="center" align="center")
                v-btn(@click="showOverlay = false" color="primary") Закрыть
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { container } from "tsyringe";
import { IStorageDumpService } from "@/services/IStorageDumpService";

@Component({
  components: {
    StorageImportDumpCmpt: () =>
      import(
        /*StorageImportDumpCmpt*/ "@/components/StorageImportDumpCmpt.vue"
      ),
    StorageExportDumpCmpt: () =>
      import(/*StorageExportDumpCmpt*/ "@/components/StorageExportDumpCmpt.vue")
  }
})
export default class HeaderCmpt extends Vue {
  public showMenu: boolean = false;
  public storageDumpCmpt:
    | "StorageImportDumpCmpt"
    | "StorageExportDumpCmpt"
    | null = null;
  public showOverlay: boolean = false;

  private readonly storageDumpService: IStorageDumpService = container.resolve(
    "IStorageDumpService"
  );

  storageDumpImport(obj: object): void {
    this.storageDumpCmpt = "StorageImportDumpCmpt";
    this.showOverlay = true;
  }

  storageDumpExport(): void {
    this.storageDumpCmpt = "StorageExportDumpCmpt";
    this.showOverlay = true;
  }

  storageDumpClear(): void {
    this.storageDumpService.clear();
  }
}
</script>
