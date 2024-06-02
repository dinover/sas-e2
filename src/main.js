import { createApp } from 'vue'; // Importa createApp desde Vue 3
import '@mdi/font/css/materialdesignicons.css'
//router
import {createRouter, createWebHashHistory} from 'vue-router'; // Importa tu enrutador desde el archivo router
//URLs
import App from './App.vue';
import ProductTable from './views/ProductTable.vue';
import HomePage from './views/HomePage.vue';
import AddProducts from './views/AddProducts.vue';
import RegistryPage from './views/RegistryPage.vue';
// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

//Rutas - Config
const routes = [
  {
    path:'/', component: HomePage, name: 'Homepage',
  },
  {
    path:'/Products', component: ProductTable, name: 'ProductPage',
  },
  {
    path:'/Agregar', component: AddProducts, name: 'AddProducts',
  },
  {
    path:'/Registros', component: RegistryPage, name: 'RegistryPage',
  }
]

const router = createRouter({
  routes:routes,
  history: createWebHashHistory(),
})

// Configura Vuetify
const vuetify = createVuetify({
  components,
  directives
});

const app = createApp(App)

app.use(router)

app.use(vuetify);

// Monta la aplicación en el elemento con el id 'app'
app.mount('#app');
