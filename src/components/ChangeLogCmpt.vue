<template lang="pug">
    div(v-html="source")
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { container } from "tsyringe";
    import { IAppService } from "@/services/IAppService";

    @Component
    export default class ChangeLogCmpt extends Vue {
        public source: string = container.resolve<IAppService>("IAppService").changeLog || "awd";
    }
</script>
