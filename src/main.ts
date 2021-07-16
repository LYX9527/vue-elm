import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'animate.css'
import icon from './libs/elmui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
axios.defaults.withCredentials = true
import {skip} from './mixin'
Vue.use(VueCookies)
Vue.use(VueAxios, axios)
Vue.use(Vant);
Vue.use(ElementUI);
Vue.use(icon);
Vue.mixin(skip);
Vue.config.productionTip = false
console.log('%c 你只管努力 %c'.concat('剩下交给天意', ' ').concat('安排！！！', '').concat("%c Verson", "-0.0.5"), "background: #35495e; padding: 1px; border-radius: 3px 0 0 3px; color: #fff",
  "background: #aaff; padding: 1px; border-radius: 0 3px 3px 0; color: #fff",
  "background: #a58; padding: 1px; border-radius: 0 3px 3px 0; color: #fff")
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

