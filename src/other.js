import Vue from 'vue'
import axios from 'axios'

Vue.config.debug = true;
Vue.config.devtools = true;

new Vue({
  el: '#app',
  data: {
  	posts: []
  },
  created () {
  	axios.get('http://jsonplaceholder.typicode.com/posts')
  		.then(response => {
  			this.posts = response.data;
  		})
  		.catch(error => {
  			console.log(error);
  		});
  }
})