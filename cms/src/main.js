// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueAnimateNumber from 'vue-animate-number'
import 'vuetify/dist/vuetify.min.css'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueAnimateNumber);
/*
Vue.filter('highlight', function(word, query){
  var check = new RegExp(query, "ig");
  return word.toString().replace(check, function(matchedText,a,b){
      return ('<v-tooltip bottom><span class=\'highlight\' slot="activator">' + matchedText + '</span><span>Tooltip</span></v-tooltip>');
  });
});
*/

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
