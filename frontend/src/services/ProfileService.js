import Api from '@/services/Api'

export default {
  profile () {
    return Api().get('profile')
  },

  update (params) {
    return Api().post('profile', params)
  },
  passChange (params) {
    return Api().put('profile', params)
  }
}
