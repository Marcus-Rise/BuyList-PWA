<template lang="pug">
    v-text-field(
        solo
        label="Фильтр"
        clearable
        v-model="model"
        autofocus
    )
        template(v-slot:prepend-inner)
            v-icon(small) fa-search
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "vue-property-decorator";

    @Component
    export default class ListSearchFilterCmpt extends Vue {
        @Prop() public readonly value!: string;

        get model(): string {
            return this.value;
        }

        set model(val: string) {
            this.$emit("input", val);
        }
    }
</script>
