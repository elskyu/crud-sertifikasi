//import createApp from Vue
import { createApp } from 'vue';

//import component App
import App from './App.vue';

//import config router
import router from './router'

import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

//create App Vue
const app = createApp(App);

app.use(Toast, {
    position: POSITION.TOP_RIGHT
  });

//gunakan "router" di Vue dengan plugin "use"
app.use(router);

app.mount('#app');