<template lang="pug">
    v-container
        v-row(align="center")
            v-col
                v-window.elevation-1(vertical)
                    v-window-item
                        v-container
                            v-card(flat)
                                v-card-text
                                    v-row.mb-4(align="center")
                                        v-col(align="center")
                                            v-btn(
                                                color="accent"
                                                @click="clear"
                                            ) Очистить данные

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IStorageDumpService } from "@/services/IStorageDumpService";
import { container } from "tsyringe";

@Component
export default class DumpClearView extends Vue {
  private readonly storageDumpService: IStorageDumpService = container.resolve(
    "IStorageDumpService"
  );

  clear(): void {
    this.storageDumpService.clear();
  }
}
</script>
