// vue
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import vuetify from '@/plugins/vuetify';
// pinia
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
// plugin
import globalDirectives from '@/plugins/global-directives';
import globalComponents from '@/plugins/global-components';
import dayjs from '@/plugins/dayjs';
import isEmpty from '@/plugins/isEmpty';
// import { loadFonts } from './plugins/webfontloader';

//loadFonts();

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(router);
app.use(vuetify);
app.use(pinia);
app.use(globalDirectives);
app.use(globalComponents);
app.use(dayjs);
app.use(isEmpty);
app.mount('#app');
