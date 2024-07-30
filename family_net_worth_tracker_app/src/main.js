import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import App from './App.vue'
import router from './router'
import Password from "primevue/password"
import {defineComponent} from 'vue'

createApp(App).use(router).use(router).use(PrimeVue,
    {
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: '.my-app-dark'
            }
        }
    }
).component('Password',Password).mount('#app');

export default defineComponent({
    name: 'MyComponent',
    components: {
      Password,
    },
    data() {
      return {
        password: '',
      };
    },
  });