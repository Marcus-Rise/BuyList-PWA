import Vue from "vue";
import Vuetify from "vuetify/lib";
import ru from "vuetify/src/locale/ru";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true
        },
        themes: {
            light: {
                primary: "#ee44aa",
                secondary: "#424242",
                accent: "#ee44aa",
                error: "#FF5252",
                info: "#2196F3",
                success: "#4CAF50",
                warning: "#FFC107"
            }
        }
    },
    lang: {
        locales: { ru },
        current: "ru"
    },
    icons: {
        iconfont: "fa"
    }
});
