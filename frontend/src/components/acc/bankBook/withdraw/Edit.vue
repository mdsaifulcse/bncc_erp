<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
            Edit Bank Withdraw
            <div class="card-btn pull-right">
              <router-link tag="a" to="/bank-withdraw" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View All</router-link>
            </div>
          </div>
          <div class="card-body">
            <form @submit.prevent="updateData">
              <div class="form-group row  ">
                <label for="session_id" class="col-md-3 control-label">Session</label>
                <div class="col-md-8">
                  <select id="session_id" disabled @change="getTotal()" required class="form-control" v-model="form.session_id">
                    <option value="" selected> -select- </option>
                    <option v-for="(ses, indx) in session" :key="indx" :value="ses._id"> {{ses.name}} </option>
                  </select>
                </div>
              </div>
              <div class="form-group row  ">
                <label for="head_id" class="col-md-3 control-label">Budget Heads </label>
                <div class="col-md-8">
                  <select id="head_id" required  class="form-control" v-model="form.head_id">
                    <option value="" selected> -select- </option>
                    <option v-for="(head, indx) in heads" :key="indx" :value="head._id"> {{head.name}} </option>
                  </select>
                </div>
              </div>
              <div class="form-group row  ">
                <label for="month" class="col-md-3 control-label">Month</label>
                <div class="col-md-8">
                  <select id="month" required class="form-control" v-model="form.month">
                    <option value="" selected> -select- </option>
                    <option v-for="(month, indx) in months" :key="indx" :value="indx"> {{month}} </option>
                  </select>
                </div>
              </div>
              <div class="form-group row  ">
                <label class="col-md-3 control-label">Submit Date</label>
                <div class="col-md-8">
                  <vuejs-datepicker type="date" format="dd-MM-yyyy" input-class="form-control"  placeholder="Select Date" required v-model="form.withdraw_date"></vuejs-datepicker>
                </div>
              </div>
              <div class="form-group row  ">
                <label for="voucher_no" class="col-md-3 control-label">Voucher No</label>
                <div class="col-md-8">
                  <input type="text" v-model="form.voucher_no" class="form-control" placeholder="Voucher No" value="" id="voucher_no">
                </div>
              </div>
              <div class="form-group row  ">
                <label for="details" class="col-md-3 control-label">Details</label>
                <div class="col-md-8">
                  <input type="text" v-model="form.details" class="form-control" placeholder="Details" value="" id="details">
                </div>
              </div>
              <div class="form-group row  ">
                <label for="amount" class="col-md-3 control-label">Amount</label>
                <div class="col-md-8">
                  <input type="number" min="0" :max="totalAmount+form.amount" v-model="form.amount" class="form-control" placeholder="Amount" value="" id="amount">
                  <small> Total Bank Book Amount : {{totalAmount}} </small>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-md-3"></div>
                <div class="col-md-9">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import BankWithdrawService from '@/services/acc/BankWithdrawService'
  export default {
    name: 'CreateExpenditure',
    data () {
      return {
        form: {
          session_id: '',
          head_id: '',
          withdraw_date: '',
          amount: '',
          voucher_no: '',
          details: '',
          month: '',
        },
        session: '',
        months: '',
        heads: '',
        totalAmount: ''
      }
    },
    mounted(){
      this.getData()
    },
    methods: {
      async getData(){
        const response = await BankWithdrawService.edit(this.$route.params.id)
        this.form = response.data
        let ses = await BankWithdrawService.session()
        this.session = ses.data
        let head = await BankWithdrawService.heads()
        this.heads = head.data
        this.months = { "1":"January", "2":"February", "3":"March", "4":"April", "5":"May", "6":"June",
          "7":"July", "8":"August", "9":"September", "10":"October", "11":"November", "12":"December" };
        let total = await BankWithdrawService.total(this.form.session_id)
        this.totalAmount = total.data
      },
      async updateData () {
        await BankWithdrawService.update(this.form)
          .then(res => {
            this.getData()
            this.$swal({
              type: 'success',
              title: 'Data Successfully Updated',
              showConfirmButton: false,
              timer: 1500
            })
            //this.$router.push({path: '/expenditure'})
          })
          .catch(err => {
            console.log(err.response.data)
          })
      }
    }
  }
</script>
<style></style>
