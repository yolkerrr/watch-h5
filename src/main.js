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
  Toast
} from 'cube-ui'

Vue.use(Dialog);
Vue.use(Toast);


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
