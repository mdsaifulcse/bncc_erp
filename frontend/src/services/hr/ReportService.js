import Api from '@/services/Api'

export default {
  regiments() {
    return Api().get('hr-reports/regiment')
  },
  session() {
    return Api().get('hr-reports/session')
  },
  employee(id) {
    return Api().get('hr-reports/employee/'+id)
  },
  performance(params) {
    return Api().post('hr-reports/performance',params)
  },
  award(params) {
    return Api().post('hr-reports/award',params)
  },
  punishment(params) {
    return Api().post('hr-reports/punishment',params)
  },
  transfer(params) {
    return Api().post('hr-reports/transfer',params)
  },
  termination(params) {
    return Api().post('hr-reports/termination',params)
  },
  attendance(params) {
    return Api().post('hr-reports/attendance',params)
  },
}
