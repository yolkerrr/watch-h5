import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()
import Vue from 'vue'
import App from './App'
import router from './router'
import './components'
import './css/icon.css'
require("!style-loader!css-loader!less-loader!./css/base");
require("!style-loader!css-loader!less-loader!./css/common");
import "./lib/jQuery.min"
import {
  /* eslint-disable no-unused-vars */
  Style,
  Dialog,
  Scroll,
  Popup,
  Toast
} from 'cube-ui'

Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Scroll);
Vue.use(Popup);
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
