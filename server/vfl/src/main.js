import '@/init';
import { store } from '@/store';
import router from './router';


import Vue from 'vue'
import VflApp from '@/App.vue'


new Vue({
  store,
  router,
  render: h => h( VflApp )
}).$mount( '#app' );
