<template lang="pug">
    v-row(align="center")
        v-col
            v-window.elevation-1(vertical)
                v-window-item
                    v-container
                        v-card(flat)
                            v-card-text
                                v-row( class="mb-4" align="center")
                                    p {{dumpObj}}

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IStorageDumpService } from "@/services/IStorageDumpService";
import { container } from "tsyringe";

@Component
export default class StorageExportDumpCmpt extends Vue {
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
