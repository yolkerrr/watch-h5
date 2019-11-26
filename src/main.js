import Vue from 'vue'
import App from './App'
import router from './router'
import './components'
import './css/icon.css'
import {Style} from "cube-ui"
require("!style-loader!css-loader!less-loader!./css/base");
require("!style-loader!css-loader!less-loader!./css/common");
import "./lib/jQuery.min"

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
