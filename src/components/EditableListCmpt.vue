<template lang="pug">
    v-list(style="position: relative")
        v-list-item(v-for="item of items" :key="item.key")
            v-list-item-content
                router-link(:to="item.href ? item.href : {}" style="text-decoration: none; color: inherit;")
                    v-list-item-title {{item.title}}
                    v-list-item-subtitle(
                        v-html="item.secondary"
                    )
            v-list-item-action
                v-btn(icon @click="editItem(item.key)")
                    v-icon(small) fa-pen
            v-list-item-action
                v-btn(icon @click="deleteItem(item.key)")
                    v-icon(small) fa-trash
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IEditableListItem } from "@/components/IEditableListItem";

@Component
export default class EditableListCmpt extends Vue {
  @Prop({ required: true }) public readonly items!: IEditableListItem[];

  editItem(key: string): void {
    this.$emit("edit", key);
  }

  deleteItem(key: string): void {
    this.$emit("delete", key);
  }
}
</script>
