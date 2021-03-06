import Vue from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
