import './assets/main.css'
import axios from 'axios';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import App from './App.vue'
import router from './router'


axios.interceptors.request.use(config => {
    const token = localStorage.getItem('employeeToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
