<template lang="pug">
    v-list(style="position: relative")
        v-list-item(v-for="item of items" :key="item.key" :to="item.href")
            v-list-item-content
                v-list-item-title {{item.title}}
                v-list-item-subtitle {{item.secondary}}
            v-list-item-action
                v-btn(icon @click="editItem(item.key)")
                    v-icon(small) fa-pen

        v-btn(
            @click="addItem()"
            color="pink"
            dark
            small
            absolute
            top
            right
            fab
        )
            v-icon(dark) fa-plus

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IEditableListItem } from "@/components/IEditableListItem";

@Component
export default class EditableListCmpt extends Vue {
  @Prop({ required: true }) public readonly items!: IEditableListItem[];

  addItem(): void {
    this.$emit("add");
  }

  editItem(key: string): void {
    this.$emit("edit", key);
  }
}
</script>
