import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createGeoI18n } from '@geo/i18n';
import { setupIcons } from '@geo/ui';
import App from './App.vue';
import router from './router';
import './styles/global.scss';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(createGeoI18n('en'));
setupIcons(app);
app.mount('#app');
