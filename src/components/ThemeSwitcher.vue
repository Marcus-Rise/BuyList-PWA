<template lang="pug">
    div
        v-icon(
            @click="toggle"
        ) {{icon}}
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { IThemeService } from "@/services/IThemeService";
    import { container } from "tsyringe";

    @Component
    export default class ThemeSwitcher extends Vue {
        private readonly themeService: IThemeService = container.resolve("IThemeService");

        get icon(): string {
            return this.$vuetify.theme.dark ? "fa-moon" : "fa-sun";
        }

        toggle(): void {
            this.themeService.toggle()
                .then((res) => {
                    this.$vuetify.theme.dark = res;
                });
        }
    }
</script>
