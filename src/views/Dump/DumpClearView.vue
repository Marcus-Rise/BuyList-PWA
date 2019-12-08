<template lang="pug">
    v-container
        v-row(align="center")
            v-col
                v-card
                    v-card-title Вы уверены?
                    v-card-actions
                        v-row
                            v-col
                                v-btn(
                                    color="accent"
                                    @click="clear"
                                    block
                                    large
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
            this.storageDumpService.clear().then(() => {
                this.$router.push("/");
            });
        }
    }
</script>
