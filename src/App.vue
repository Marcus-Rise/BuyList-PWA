<template lang="pug">
    v-app
        app-update-cmpt
        header-cmpt
        v-content
            transition
                router-view
        footer-cmp
</template>

<script>
    import { Component, Vue } from "vue-property-decorator";
    import HeaderCmpt from "@/components/HeaderCmpt";
    import FooterCmp from "@/components/FooterCmp";
    import AppUpdateCmpt from "@/components/AppUpdateCmpt";

    @Component({
        components: { AppUpdateCmpt, FooterCmp, HeaderCmpt }
    })
    export default class App extends Vue {
    }
</script>
