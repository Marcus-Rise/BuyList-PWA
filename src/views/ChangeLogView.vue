<template lang="pug">
    v-container
        v-row
            v-col
                v-card
                    v-card-title Список изменений
                    v-card-text(v-html="source")
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { container } from "tsyringe";
    import { IAppService } from "@/services/IAppService";

    @Component
    export default class ChangeLogView extends Vue {
        public readonly source: string = container.resolve<IAppService>("IAppService").changeLog;
    }
</script>
