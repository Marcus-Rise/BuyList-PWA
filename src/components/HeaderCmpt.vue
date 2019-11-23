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
                    v-img(src="/img/profile-min.png")
                v-list-item-content BuyList

            v-divider

            v-list(dense)
                v-list-item(link :to="{ name: 'productListArray' }")
                    v-list-item-icon
                        v-icon fa-list-ul
                    v-list-item-content Списки продуктов
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class HeaderCmpt extends Vue {
  public showMenu: boolean = false;

  storageDumpImport(): void {
    this.$router.push({ name: "dumpImport" });
  }

  storageDumpExport(): void {
    this.$router.push({ name: "dumpExport" });
  }

  storageDumpClear(): void {
    this.$router.push({ name: "dumpClear" });
  }
}
</script>
