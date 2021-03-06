// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
let apiUrl = 'http://localhost:8002/'
//let apiUrl = 'http://be.leamerp.com:8080/'
import Vue from 'vue'
window.$ = require('jquery')
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import App from './App.vue'
import router from './router'
import Main from './components/layouts/MainLayouts.vue'
import Login from './components/layouts/LoginLayouts.vue'
import VueSweetalert2 from 'vue-sweetalert2'
import iziToast from 'izitoast'
import axios from 'axios'
import { store } from './store'
import Datetime from 'vue-datetime'
import Datepicker from 'vuejs-datepicker';
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'
import VueFilterDateFormat from 'vue-filter-date-format'
import Print from 'vue-print-nb'
import JsonExcel from 'vue-json-excel'
import VueJwtDecode from 'vue-jwt-decode'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
Vue.use(VueSidebarMenu)

Vue.use(Vuetify)
Vue.component('downloadExcel', JsonExcel)
Vue.use(Print)
import veeValidate from 'vee-validate'
Vue.use(VueFilterDateFormat)
Vue.use(Datetime)
Vue.use(VueAxios, axios)
Vue.use(veeValidate)
Vue.component('vuejs-datepicker', Datepicker)
Vue.component('main-layout', Main)
Vue.component('login-layout', Login)
Vue.use(VueSweetalert2)
Vue.use(require('vue-script2'))
Vue.config.productionTip = false
Vue.prototype.$iziToast = iziToast
Vue.prototype.$auth = ''
if(localStorage.getItem("token")!==null){
  Vue.prototype.$auth = VueJwtDecode.decode(localStorage.getItem("token"))
}
//Vue.prototype.$mainUrl = 'http://be.leamerp.com:8080/'
localStorage.setItem('apiUrl', apiUrl)
Vue.prototype.$baseUrl = apiUrl + 'upload/'
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token') !== null) {
    axios.defaults.headers.common['Authorization'] = 'Bearar ' + localStorage.getItem('token')
  }
  /* if (to.path !== '/login') {
    Api().get('token-check').catch(err => {
      localStorage.removeItem('token')
      this.$router.push({path: '/login'})
      console.log(err)
    })
  } */
  next()
})

const newApp = new Vue({
  data: { loading: false },
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  newApp.loading = true
  next()
})
router.afterEach(() => {
  //Vue.prototype.$loading = false
  setTimeout(() => newApp.loading = false ,0) // timeout for demo purposes

})
