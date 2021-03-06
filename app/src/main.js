import Vue from 'vue'
import App from './App.vue'
import { Button, Message, Drawer } from "element-ui";
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

Vue.component(Button.name, Button);
Vue.component(Drawer.name, Drawer);

Vue.prototype.$message = Message;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
