<template lang="pug">
    v-container
        v-row(align="center")
            v-col
                v-card(flat)
                    v-card-text
                        v-row.mb-4(align="center")
                            v-col
                                p {{dumpObj}}
            v-col(cols="12")
                v-btn(
                    color="primary"
                    block
                    large
                    v-clipboard="() => dumpObj"
                ) Скопировать

</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { IStorageDumpService } from "@/services/IStorageDumpService";
    import { container } from "tsyringe";
    import Clipboard from "v-clipboard";

    Vue.use(Clipboard);

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
