<template lang="pug">
    v-footer(
        height="auto"
    )
        v-container
            v-layout
                v-spacer
                div
                    | &copy; {{ year }} -&nbsp;
                    a(href="marcus-rise.dev" style="color: inherit") Ilya Konstantinov
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class FooterCmt extends Vue {
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
}
</script>
