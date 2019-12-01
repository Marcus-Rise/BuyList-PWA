<template lang="pug">
    v-app
        header-cmpt
        v-content
            transition
                router-view
        app-update-cmpt
        footer-cmp
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import HeaderCmpt from "@/components/HeaderCmpt";
import FooterCmp from "@/components/FooterCmp";
import AppUpdateCmpt from "@/components/AppUpdateCmpt";

@Component({
  components: { AppUpdateCmpt, FooterCmp, HeaderCmpt }
})
export default class App extends Vue {}
</script>
