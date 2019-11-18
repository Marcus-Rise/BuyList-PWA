<template lang="pug">
    v-app
        header-cmpt
        v-content
            transition
                router-view
        footer-cmp
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import HeaderCmpt from "@/components/HeaderCmpt";
import FooterCmp from "@/components/FooterCmp";

@Component({
  components: { FooterCmp, HeaderCmpt }
})
export default class App extends Vue {}
</script>
