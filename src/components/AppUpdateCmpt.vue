<template lang="pug">
    div
        v-progress-linear(v-if="updating" indeterminate)
        v-snackbar(
            top
            :value="updating"
        ) Загрузка приложения...
        v-snackbar(
            :timeout="20000"
            top
            :value="updateExists"
        )
            | Доступна новая версия!
            v-btn(
                color="accent"
                text
                @click="refreshApp"
            ) Обновить
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component
    export default class AppUpdateCmpt extends Vue {
        refreshing: boolean = false;
        updating: boolean = false;
        registration: any = null;
        updateExists: boolean = false;

        created() {
            document.addEventListener("swUpdated", this.showRefreshUI, {
                once: true
            });

            document.addEventListener(
                "swUpdating",
                () => {
                    this.updating = true;
                },
                {
                    once: true
                }
            );

            navigator.serviceWorker.addEventListener("controllerchange", () => {
                if (this.refreshing) return;
                this.refreshing = true;
                window.location.reload();
            });
        }

        showRefreshUI(e: any) {
            this.registration = e.detail;
            this.updateExists = true;
            this.updating = false;
        }

        refreshApp() {
            this.updateExists = false;
            if (!this.registration || !this.registration.waiting) {
                return;
            }
            this.registration.waiting.postMessage("skipWaiting");
        }
    }
</script>
