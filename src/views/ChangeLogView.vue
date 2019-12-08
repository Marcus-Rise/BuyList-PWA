<template lang="pug">
    v-container
        v-col
            div(v-html="source")
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { container } from "tsyringe";
    import { IAppService } from "@/services/IAppService";

    @Component
    export default class ChangeLogView extends Vue {
        public source: string = container.resolve<IAppService>("IAppService").changeLog;
    }
</script>
