import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import VueGoodTablePlugin from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueInputNumberPlugin from '@robin-rossow/vue-input-number'
import VueMqtt from 'vue-mqtt';

const app = createApp(App);
app.use(router);
app.use(VueGoodTablePlugin);
app.use(VueInputNumberPlugin);
app.use(VueAxios, axios);
//app.use(VueMqtt, 'mqttbroker.srchen.cc');
app.mount("#app");


