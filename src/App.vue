<template lang="pug">
    v-app
        header-cmpt
        v-container
            transition
                router-view
</template>

<script>
    import { Vue, Component } from "vue-property-decorator";
    import HeaderCmpt from "@/components/HeaderCmpt";

    @Component({
        components: { HeaderCmpt }
    })
    export default class App extends Vue {
    }
</script>
