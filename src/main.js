import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
// import { loadFonts } from './plugins/webfontloader';
import globalDirectives from './plugins/global-directives';
import globalComponents from './plugins/global-components';
import dayjs from './plugins/dayjs';
import isEmpty from './plugins/isEmpty';

//loadFonts();

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.use(createPinia());
app.use(globalDirectives);
app.use(globalComponents);
app.use(dayjs);
app.use(isEmpty);
app.mount('#app');
