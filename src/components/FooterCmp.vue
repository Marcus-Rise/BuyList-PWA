<template lang="pug">
    v-footer(
        height="auto"
    )
        v-container
            v-row(dense)
                v-col(xs="12" sm="12" md="4" cols="12")
                    a(:href="supportEmail" style="color: inherit") Support email
                v-col(xs="12" md="4" sm="12" cols="12")
                    div версия: {{appService.version}}
                v-col(xs="12" md="4" sm="12" cols="12")
                    | &copy; {{ year }} -&nbsp;
                    a(href="https://marcus-rise.dev" style="color: inherit") {{appService.author}}
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { IAppService } from "@/services/IAppService";
    import { container } from "tsyringe";

    @Component
    export default class FooterCmt extends Vue {
        public readonly supportEmail: string =
            "mailto:incoming+marcus-rise-buylist-pwa-15263181-issue-@incoming.gitlab.com";

        get year(): string {
            let val: string;
            if (this.yearNow >= this.yearStart) {
                val = this.yearNow.toString();
    } else {
      val = `${this.yearStart} - ${this.yearNow}`;
    }

    return val;
  }

  private readonly yearStart: number = 2019;
  private readonly yearNow: number = new Date().getFullYear();
  private readonly appService: IAppService = container.resolve("IAppService");
}
</script>
