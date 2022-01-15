import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
Vue.use(uView);
Vue.config.productionTip = false

App.mpType = 'app'
// 打印版本
const version = uni.$u.config.v;
console.log("\n %c uview V"+version+" %c https://www.uviewui.com/ \n\n", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;");

const app = new Vue({
  ...App
})
app.$mount()
