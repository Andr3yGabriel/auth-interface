import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';
import Aura from '@primevue/themes/aura';
import router from './router';
import 'primeicons/primeicons.css';

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: '.app-dark',
            cssLayer: false
        }
    }
});
app.directive('tooltip', Tooltip);
app.use(ToastService);
app.use(router);
app.mount('#app');