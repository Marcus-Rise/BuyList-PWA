<template lang="pug">
    v-footer(
        height="auto"
    )
        v-container
            v-row(dense)
                v-col(
                    xs="12"
                    md="4"
                    cols="12"
                )
                    a(
                        :href="supportEmail"
                        style="color: inherit"
                    ) Support email
                v-col(
                    xs="12"
                    md="4"
                    cols="12"
                )
                    router-link(
                        :to="{ name: 'changelog' }"
                        style="color: inherit"
                    ) версия: {{version}}
                v-col(
                    xs="12"
                    md="4"
                    cols="12"
                )
                    | &copy; {{ year }} -&nbsp;
                    a(
                        :href="authorSiteUrl"
                        style="color: inherit"
                    ) {{author}}
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { IAppService } from "@/services/IAppService";
    import { container } from "tsyringe";

    @Component
    export default class FooterCmt extends Vue {
        public readonly supportEmail: string =
            "mailto:incoming+marcus-rise-buylist-pwa-15263181-issue-@incoming.gitlab.com";
        public readonly authorSiteUrl: string = "https://marcus-rise.dev";

        get year(): string {
            let val: string;
            if (this.yearNow >= this.yearStart) {
                val = this.yearNow.toString();
            } else {
                val = `${this.yearStart} - ${this.yearNow}`;
            }

            return val;
        }

        get version(): string {
            return this.appService.version;
        }

        get author(): string {
            return this.appService.author;
        }

        private readonly yearStart: number = 2019;
        private readonly yearNow: number = new Date().getFullYear();
        private readonly appService: IAppService = container.resolve("IAppService");
    }
</script>
