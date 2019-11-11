<template lang="pug">
    header
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
                    v-list-item
                        v-list-item-title Экспорт данных
                    v-list-item
                        v-list-item-title Импорт данных

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
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component
    export default class HeaderCmpt extends Vue {
        public showMenu: boolean = true;
    }
</script>
