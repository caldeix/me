import { createApp } from 'vue';
import App from './App.vue';
import store from './store/index.js';
import { createI18n } from 'vue-i18n';

const app = createApp(App);
app.use(store); // Agrega el store Vuex a la aplicación Vue

// Configura vue-i18n
const i18n = createI18n({
  locale: 'es', // idioma predeterminado
  messages: {
    es: require('../src/literals_es.json')
  },
});

app.config.globalProperties.$i18nGlobal = i18n;

app.use(i18n); // Agrega vue-i18n a la aplicación Vue

app.mount('#app');
