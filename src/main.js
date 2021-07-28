import Vue from 'vue'
import App from './App.vue'
import KFormDesign from "k-form-design";
import "k-form-design/lib/k-form-design.css";

Vue.config.productionTip = false
Vue.use(KFormDesign)

new Vue({
  render: h => h(App),
}).$mount('#app')
