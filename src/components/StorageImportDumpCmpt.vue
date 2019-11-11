<template lang="pug">
    v-row(align="center")
        v-col
            v-window.elevation-1(vertical)
                v-window-item
                    v-container
                        v-card(flat)
                            v-card-text
                                v-row( class="mb-4" align="center")
                                    v-form
                                        v-container
                                            v-row
                                                v-col
                                                    v-textarea(
                                                        outlined
                                                        v-model="dumpObjStringify"
                                                    )
                                            v-row(justify="center")
                                                v-btn(@click="dump()") Импортировать
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { container } from "tsyringe";
    import { IStorageDumpService } from "@/services/IStorageDumpService";

    @Component
    export default class StorageImportDumpCmpt extends Vue {
        public appendMode: boolean = true;
        public dumpObjStringify: string = "";

        private readonly storageDumpService: IStorageDumpService = container.resolve("IStorageDumpService");

        dump(): void {
            this.storageDumpService.import(JSON.parse(this.dumpObjStringify), this.appendMode);
        }
    }
</script>
