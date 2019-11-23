<template lang="pug">
    v-container
        v-row(justify="center")
            v-col(
                sm="8"
            )
                v-card
                    v-card-title.text-center Ошибка 404
                    v-card-text Страница не найдена
                    v-card-actions
                        v-row
                            v-col(
                                cols="12"
                                xsm="12"
                                sm="6"
                            )
                                v-btn(
                                    color="primary"
                                    large
                                    link
                                    block
                                    to="/"
                                ) На главную
                            v-col(
                                cols="12"
                                xsm="12"
                                sm="6"
                            )
                                v-btn(
                                    color="primary"
                                    block
                                    large
                                    @click="back"
                                ) Назад
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ErrorNotFoundView extends Vue {
  back(): void {
    this.$router.go(-1);
  }
}
</script>
