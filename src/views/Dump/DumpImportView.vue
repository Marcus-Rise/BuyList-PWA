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
                                        v-col
                                            v-form(
                                                @submit.prevent="dump"
                                                lazy-validation
                                            )
                                                v-container
                                                    v-row
                                                        v-col
                                                            v-textarea(
                                                                outlined
                                                                v-model="dumpObjStringify"
                                                                :rules="[v => !!v || 'Вставьте дамп в формате JSON']"
                                                            )
                                                    v-row
                                                        v-col
                                                            v-checkbox(
                                                                v-model="cleanMode"
                                                                :label="`Затереть текущие данные: ${cleanMode ? 'да' : 'нет'}`"
                                                            )
                                                    v-row(justify="center")
                                                        v-btn(
                                                            type="submit"
                                                            color="primary"
                                                            block
                                                            large
                                                        ) Импортировать
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IStorageDumpService } from "@/services/IStorageDumpService";
import { container } from "tsyringe";

@Component
export default class DumpImportView extends Vue {
  public cleanMode: boolean = false;
  public dumpObjStringify: string = "";

  get appendMode(): boolean {
    return !this.cleanMode;
  }

  private readonly storageDumpService: IStorageDumpService = container.resolve(
    "IStorageDumpService"
  );

  dump(): void {
    if (this.dumpObjStringify) {
      this.storageDumpService.import(
        JSON.parse(this.dumpObjStringify),
        this.appendMode
      );
    }
  }
}
</script>
