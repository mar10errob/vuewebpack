import Vue from 'vue'
import App from './App.vue'

Vue.component('application', App)

new Vue({
  el: '#app',
  //render: h => h(App)
})
