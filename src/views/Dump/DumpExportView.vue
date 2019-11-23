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
                                        p {{dumpObj}}
            v-col(cols="12")
                v-btn(
                    color="primary"
                    block
                    large
                ) Скопировать

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IStorageDumpService } from "@/services/IStorageDumpService";
import { container } from "tsyringe";

@Component
export default class DumpExportView extends Vue {
  public dumpObj: object | null = null;

  private readonly storageDumpService: IStorageDumpService = container.resolve(
    "IStorageDumpService"
  );

  created(): void {
    this.storageDumpService.export().then(obj => {
      this.dumpObj = obj;
    });
  }
}
</script>
