<template>
  <v-snackbar top v-model="updateExists">
    Доступна новая версия!
    <v-btn color="accent" text @click="refreshApp">Обновить </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "AppUpdateCmpt",
  data() {
    return {
      refreshing: false,
      registration: null,
      updateExists: false
    };
  },
  created() {
    document.addEventListener("swUpdated", this.showRefreshUI, {
      once: true
    });
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  },
  methods: {
    showRefreshUI(e) {
      this.registration = e.detail;
      this.updateExists = true;
    },
    refreshApp() {
      this.updateExists = false;
      if (!this.registration || !this.registration.waiting) {
        return;
      }
      this.registration.waiting.postMessage("skipWaiting");
    }
  }
};
</script>
