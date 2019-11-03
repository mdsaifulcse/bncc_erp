import Api from '@/services/Api'
export default {
  module () {
    return Api().get('frontend/modules')
  },
  loadMenu (id) {
    return Api().get('frontend/load-menu/'+id)
  },
  singleModule (id) {
    return Api().get('frontend/module/'+id)
  },
  menu () {
    return Api().get('frontend')
  },
  info () {
    return Api().get('frontend/info')
  },
  regiment () {
    return Api().get('frontend/regiment')
  },
  newBudget () {
    return Api().get('frontend/budget')
  }
}
