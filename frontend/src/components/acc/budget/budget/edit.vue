<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
            Edit Budget
            <div class="card-btn pull-right">
              <router-link tag="a" to="/budget" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View All</router-link>
            </div>
          </div>
          <div class="card-body">
            <div class="form-group row">
              <div class="col-md-4 row no-margin">
                <label for="session_id" class="col-md-12"> Budget Session </label>
                <div class="col-sm-10"  style="width: 70%">
                  <select id="session_id" required class="form-control" v-model="form.session_id">
                    <option value="" selected> -select- </option>
                    <option v-for="(ses, indx) in session" :key="indx" :value="ses._id"> {{ses.name}} </option>
                  </select>
                </div>
                <div class="col-xs-2 no-padding">
                  <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal">
                    <i class="fa fa-plus"></i>
                  </button>
                  <!-- Modal -->
                  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h4 class="modal-title" id="myModalLabel">Add Session</h4>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div class="modal-body">
                          <input type="text" class="form-control" placeholder="Session" required v-model="session_name">
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="sessionAdd()" >Save</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <label class="col-md-12">Budget Date</label>
                <div class="col-md-12">
                  <vuejs-datepicker type="date" format="dd-MM-yyyy" input-class="form-control"  placeholder="Select Date" required v-model="form.budget_date"></vuejs-datepicker>
                </div>
              </div>
              <div class="col-md-4">
                <label for="amount" class="col-md-12">Total Budget Amount</label>
                <div class="col-md-12">
                  <input type="number" min="0" v-model="form.amount" class="form-control" placeholder="Budget Amount" id="amount">
                </div>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-6"  v-for="i in Math.ceil(heads.length / devideHead)" :key="i">
                <div class="table-responsive">
                  <table class="table table-bordered min-padding-table">
                    <tr>
                      <th width="10%">E. Code</th>
                      <th>Description</th>
                      <th width="40%">Amount</th>
                    </tr>
                    <tr  v-for="(head, index) in heads.slice((i - 1) * devideHead, i * devideHead)" :key="index">
                      <td> {{head.code}} </td>
                      <td> {{head.name}}</td>
                      <td><input v-if="i<2" type="number" v-model="form.head_value[index].amount" min="0" :max="restAmount" @keyup="totalAmount" placeholder="Amount" required class="form-control min-height">
                        <input v-else="" type="number" v-model="form.head_value[devideHead+index].amount" min="0" :max="restAmount" @keyup="totalAmount" placeholder="Amount" required class="form-control min-height"> <input v-if="i<2" type="hidden" v-model="form.head_value[index].head_id"> <input v-else="" type="hidden" v-model="form.head_value[devideHead+index].head_id"> </td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="col-md-12">
                <p v-if="total>0"> Total Amount : <b class="text-success">{{total}}</b></p>
              </div>
            </div>
            <div class="form-group row">

              <div class="col-md-12">
                <button type="submit" @click="update" class="btn btn-primary">Save change</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import BudgetService from '@/services/acc/budget/BudgetService'
  import SessionService from '@/services/acc/budget/SessionService'
  export default {
    name: 'BudgetAdd',
    data () {
      return {
        form: {
          session_id: '',
          budget_date: new Date().toJSON().slice(0,10),
          amount: 0,
          head_value: [],
          id: ''
        },
        heads: [],
        devideHead: 28,
        session: '',
        session_name: '',
        total: 0
      }
    },
    mounted () {
      this.getData(),
      this.totalAmount()
    },
    computed: {
      restAmount: function () {
        return this.form.amount
      }
    },
    methods: {
      async getData(){
        const response = await BudgetService.show({
          id: this.$route.params.id
        })
        this.form = response.data
        this.form.id = this.$route.params.id
        let headValue = await BudgetService.headValue({
          id: this.$route.params.id
        })
        // let head = await BudgetService.heads()
        this.heads = headValue.data
        let i = 0
        let newHead = []
        for (i=0; i < this.heads.length; i++) {
          newHead.push({head_id:this.heads[i].head_id, amount: this.heads[i].amount})
        }
        this.form.head_value = newHead
        let ses = await BudgetService.session()
        this.session = ses.data
      },
      async update () {
        await BudgetService.update(this.form)
          .then(res => {
            this.$swal({
              type: 'success',
              title: 'Data Successfully Update',
              showConfirmButton: false,
              timer: 1500
            })
          })
          .catch(err => {
            console.log(err)
          })
      },
      async sessionAdd () {
        await SessionService.store({name: this.session_name})
          .then(res => {
            this.session_name = ''
            this.$swal({
              type: 'success',
              title: 'Data Successfully Saved',
              showConfirmButton: false,
              timer: 1500
            })
            this.form.session_id = res.data.result._id
            this.session.push(res.data.result)
          })
          .catch(err => {
            console.log(err)
          })
      },
      totalAmount(){
        let ta = 0
        let i = 0
        for (i=0; i < this.heads.length; i++) {
          ta = ta + parseInt(this.form.head_value[i].amount)
        }
        this.total = ta
      }
    }
  }
</script>
<style></style>
