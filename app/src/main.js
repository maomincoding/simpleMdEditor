import Vue from 'vue';
import App from './App.vue';
import { Button, Message, Dialog } from "element-ui";
import 'normalize.css/normalize.css'; // a modern alternative to CSS resets

Vue.component(Button.name, Button);
Vue.component(Dialog.name, Dialog);
Vue.prototype.$message = Message;

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
