<template lang="pug">
    v-app
        app-update-cmpt
        header-cmpt
        v-content
            transition
                router-view
        footer-cmp
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import HeaderCmpt from "@/components/HeaderCmpt.vue";
    import FooterCmp from "@/components/FooterCmp.vue";
    import AppUpdateCmpt from "@/components/AppUpdateCmpt.vue";
    import { IThemeService } from "@/services/IThemeService";
    import { container } from "tsyringe";

    @Component({
        components: { AppUpdateCmpt, FooterCmp, HeaderCmpt }
    })
    export default class App extends Vue {
        private readonly themeService: IThemeService = container.resolve("IThemeService");

        created(): void {
            this.themeService.getIsDark()
                .then((res) => {
                    this.$vuetify.theme.dark = res;
                });
        }
    }
</script>
