import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from "element-ui"
Vue.config.silent = true
import axios from 'axios'
import { Message } from 'element-ui'
// 挂载到$message上
Vue.prototype.$message = Message
axios.defaults.baseURL="http://11.1.3.213:3000"
Vue.prototype.$http=axios
Vue.use(ElementUI);
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
