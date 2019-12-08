import Vue from "vue";

Vue.filter("price", (value: string) => {
    return `₽ ${parseFloat(value).toFixed(2)}`;
});
