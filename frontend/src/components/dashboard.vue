<template>
<span class="Dashboard">
  <div class="row">
    <div class="col-lg-12 col-md-12">
      <div>
      <div v-if="acc" class="row">
        <div class="col-md-12 dashboard-head">
          <h4> Accounting </h4>
        </div>
        <div class="col-md-4">
            <div class="card">
              <router-link to="/reports/budget">
                <div class="card-block">
                  <div class="row align-items-center">
                      <div class="col-8">
                      <h4 class="text-c-green">{{budget.name}}</h4>
                      <h6 class="secondTitle text-muted m-b-0">Amount: {{budget.amount}}</h6>
                      </div>
                      <div class="col-4 text-right">
                      <i class="feather icon-file-text f-28"></i>
                      </div>
                  </div>
                </div>
                <div class="card-footer bg-c-green">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0"> Head Wise Total Received </p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-up text-white f-16"></i>
                    </div>
                </div>
                </div>
                </router-link>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card">
              <router-link to="/reports/budget-distribute/5bd067e77331240188146c8e">
                <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 class="text-c-green">HQ</h4>
                    <h6 class="secondTitle text-muted m-b-0">Budget Year: {{budget.name}}</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-calendar f-28"></i>
                    </div>
                </div>
                </div>
                <div class="card-footer bg-c-green">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0">Head Wise Received by HQ</p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-down text-white f-16"></i>
                    </div>
                </div>
                </div>
              </router-link>
            </div>
            </div>
        <div class="col-md-4">
            <div class="card">
              <router-link to="/reports/budget-distribute">
                <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 class="text-c-green">Division</h4>
                    <h6 class="secondTitle text-muted m-b-0">Budget Received</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-thumbs-down f-28"></i>
                    </div>
                </div>
                </div>
                <div class="card-footer bg-c-green">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0">Head Wise Received by REG</p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-down text-white f-16"></i>
                    </div>
                </div>
                </div>
              </router-link>
            </div>
            </div>
        </div>
      <div v-if="acc" class="row">
            <div class="col-md-4">
            <div class="card">
              <router-link to="/reports/expenditure">
                <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 class="text-c-green">Expenditure</h4>
                    <h6 class="secondTitle text-muted m-b-0">Budget: {{budget.name}}</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-bar-chart-2 f-28"></i>
                    </div>
                </div>
                </div>
                <div class="card-footer bg-c-green">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0">Head Wise Total Expenditure</p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-up text-white f-16"></i>
                    </div>
                </div>
                </div>
              </router-link>
            </div>
            </div>
            <div class="col-md-4">
            <div class="card">
              <router-link to="/reports/reg-expenditure/5bd067e77331240188146c8e">
                <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 class="text-c-green">HQ</h4>
                    <h6 class="secondTitle text-muted m-b-0">Expenditure</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-file-text f-28"></i>
                    </div>
                </div>
                </div>
                <div class="card-footer bg-c-green">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0">Head Wise Expenditure by HQ</p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-up text-white f-16"></i>
                    </div>
                </div>
                </div>
              </router-link>
            </div>
            </div>
            <div class="col-md-4">
            <div class="card">
              <router-link to="/reports/reg-expenditure">
                <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 class="text-c-green">Division</h4>
                    <h6 class="secondTitle text-muted m-b-0">Expenditure</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-calendar f-28"></i>
                    </div>
                </div>
                </div>
                <div class="card-footer bg-c-green">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0">Head Wise Expenditure by REG</p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-down text-white f-16"></i>
                    </div>
                </div>
                </div>
              </router-link>
            </div>
            </div>
        </div>
      <div v-if="acc" class="row">
           <div class="col-md-3">
            <div class="card">
              <router-link to="/reports/welfare/5bd067e77331240188146c8e">
                <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 class="text-c-green">HQ</h4>
                    <h6 class="secondTitle text-muted m-b-0">Welfare fund</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-thumbs-down f-28"></i>
                    </div>
                </div>
                </div>
                <div class="card-footer bg-c-green">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0">Received from HQ</p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-down text-white f-16"></i>
                    </div>
                </div>
                </div>
              </router-link>
            </div>
            </div>
           <div class="col-md-3">
            <div class="card">
              <router-link to="/reports/welfare">
                <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 class="text-c-green">Division</h4>
                    <h6 class="secondTitle text-muted m-b-0">Welfare fund</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-bar-chart-2 f-28"></i>
                    </div>
                </div>
                </div>
                <div class="card-footer bg-c-green">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0">Received from REG	</p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-up text-white f-16"></i>
                    </div>
                </div>
                </div>
              </router-link>
            </div>
            </div>
            <div class="col-md-3">
            <div class="card">
              <router-link to="/reports/welfare-expenditure/5bd067e77331240188146c8e">
                <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 class="text-c-green">HQ</h4>
                    <h6 class="secondTitle text-muted m-b-0">Welfare Paid</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-file-text f-28"></i>
                    </div>
                </div>
                </div>
                <div class="card-footer bg-c-green">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0">Paid To HQ Employee</p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-up text-white f-16"></i>
                    </div>
                </div>
                </div>
              </router-link>
            </div>
            </div>
            <div class="col-md-3">
            <div class="card">
              <router-link to="/reports/welfare-expenditure">
                <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 class="text-c-green">Division</h4>
                    <h6 class="secondTitle text-muted m-b-0">Welfare Paid</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-calendar f-28"></i>
                    </div>
                </div>
                </div>
                <div class="card-footer bg-c-green">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0">Paid To REG Employee</p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-down text-white f-16"></i>
                    </div>
                </div>
                </div>
              </router-link>
            </div>
            </div>
        </div>
      <div v-if="acc" class="row">
      <div class="col-md-4">
          <div class="card">
            <router-link to="/reports/ntr">
              <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 class="text-c-green">NTR</h4>
                    <h6 class="secondTitle text-muted m-b-0">Total Value</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-file-text f-28"></i>
                    </div>
                </div>
              </div>
              <div class="card-footer bg-c-green">
              <div class="row align-items-center">
                  <div class="col-9">
                  <p class="text-white m-b-0"> Find Total Value of NTR </p>
                  </div>
                  <div class="col-3 text-right">
                  <i class="feather icon-trending-up text-white f-16"></i>
                  </div>
              </div>
              </div>
              </router-link>
          </div>
      </div>
          <div class="col-md-4">
          <div class="card">
            <router-link to="/reports/ntr-deposit/5bd067e77331240188146c8e">
              <div class="card-block">
              <div class="row align-items-center">
                  <div class="col-8">
                  <h4 class="text-c-green">HQ</h4>
                  <h6 class="secondTitle text-muted m-b-0">NTR Deposit</h6>
                  </div>
                  <div class="col-4 text-right">
                  <i class="feather icon-calendar f-28"></i>
                  </div>
              </div>
              </div>
              <div class="card-footer bg-c-green">
              <div class="row align-items-center">
                  <div class="col-9">
                  <p class="text-white m-b-0">NTR Deposited By HQ	</p>
                  </div>
                  <div class="col-3 text-right">
                  <i class="feather icon-trending-down text-white f-16"></i>
                  </div>
              </div>
              </div>
            </router-link>
          </div>
          </div>
          <div class="col-md-4">
          <div class="card">
            <router-link to="/reports/ntr-deposit">
              <div class="card-block">
              <div class="row align-items-center">
                  <div class="col-8">
                  <h4 class="text-c-green">Division</h4>
                  <h6 class="secondTitle text-muted m-b-0">NTR Deposit</h6>
                  </div>
                  <div class="col-4 text-right">
                  <i class="feather icon-thumbs-down f-28"></i>
                  </div>
              </div>
              </div>
              <div class="card-footer bg-c-green">
              <div class="row align-items-center">
                  <div class="col-9">
                  <p class="text-white m-b-0">NTR Deposited By REG</p>
                  </div>
                  <div class="col-3 text-right">
                  <i class="feather icon-trending-down text-white f-16"></i>
                  </div>
              </div>
              </div>
            </router-link>
          </div>
          </div>
      </div>
      <div class="row" v-if="hrm">
        <div class="col-md-12 dashboard-head">
          <h4> HRM </h4>
        </div>
        <br>
        <div class="col-md-4">
          <div class="card">
            <router-link to="/find-employee">
              <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 class="text-c-green">Employee</h4>
                    <h6 class="secondTitle text-muted m-b-0">List</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-file-text f-28"></i>
                    </div>
                </div>
              </div>
              <div class="card-footer bg-c-green">
              <div class="row align-items-center">
                  <div class="col-9">
                  <p class="text-white m-b-0"> Find Employee </p>
                  </div>
                  <div class="col-3 text-right">
                  <i class="feather icon-trending-up text-white f-16"></i>
                  </div>
              </div>
              </div>
              </router-link>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <router-link to="/find-performance">
              <div class="card-block">
              <div class="row align-items-center">
                  <div class="col-8">
                  <h4 class="text-c-green">Performance</h4>
                  <h6 class="secondTitle text-muted m-b-0">Find</h6>
                  </div>
                  <div class="col-4 text-right">
                  <i class="feather icon-calendar f-28"></i>
                  </div>
              </div>
              </div>
              <div class="card-footer bg-c-green">
              <div class="row align-items-center">
                  <div class="col-9">
                  <p class="text-white m-b-0">Find Performance by Division	</p>
                  </div>
                  <div class="col-3 text-right">
                  <i class="feather icon-trending-down text-white f-16"></i>
                  </div>
              </div>
              </div>
            </router-link>
          </div>
          </div>
          <div class="col-md-4">
            <div class="card">
            <router-link to="/find-award">
              <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 class="text-c-green">Award</h4>
                    <h6 class="secondTitle text-muted m-b-0">Find</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-thumbs-down f-28"></i>
                    </div>
                </div>
                </div>
                <div class="card-footer bg-c-green">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0">Find Employee Award</p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-down text-white f-16"></i>
                    </div>
                </div>
                </div>
              </router-link>
            </div>
          </div>
      </div>
        <div v-if="hrm" class="row">
           <div class="col-md-4">
            <div class="card">
              <router-link to="/find-punishment">
                <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 class="text-c-green">Punishment</h4>
                    <h6 class="secondTitle text-muted m-b-0">Find</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-thumbs-down f-28"></i>
                    </div>
                </div>
                </div>
                <div class="card-footer bg-c-green">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0">Find Employee Punishment</p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-down text-white f-16"></i>
                    </div>
                </div>
                </div>
              </router-link>
            </div>
            </div>
           <div class="col-md-4">
            <div class="card">
              <router-link to="/find-transfer">
                <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 class="text-c-green">Transfer</h4>
                    <h6 class="secondTitle text-muted m-b-0">Find</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-bar-chart-2 f-28"></i>
                    </div>
                </div>
                </div>
                <div class="card-footer bg-c-green">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0">Find Employee Transfer</p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-up text-white f-16"></i>
                    </div>
                </div>
                </div>
              </router-link>
            </div>
            </div>
            <div class="col-md-4">
            <div class="card">
              <router-link to="/find-termination">
                <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 class="text-c-green">Termination</h4>
                    <h6 class="secondTitle text-muted m-b-0">Find</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-file-text f-28"></i>
                    </div>
                </div>
                </div>
                <div class="card-footer bg-c-green">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0">Find Employee Termination</p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-up text-white f-16"></i>
                    </div>
                </div>
                </div>
              </router-link>
            </div>
            </div>
            <div class="col-md-3" style="display: none">
            <div class="card">
              <router-link to="/reports/welfare-expenditure">
                <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 class="text-c-green">Division</h4>
                    <h6 class="secondTitle text-muted m-b-0">Welfare Paid</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-calendar f-28"></i>
                    </div>
                </div>
                </div>
                <div class="card-footer bg-c-green">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0">Paid To REG Employee</p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-down text-white f-16"></i>
                    </div>
                </div>
                </div>
              </router-link>
            </div>
            </div>
        </div>
      </div>
      <div  v-if="reg">
        <div class="row">
            <div class="col-md-4" v-for="(reg , i) in regiments" :key="i">
            <div class="card">
                <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 :class="'text-c-'+color[i]">{{reg.short_name}} </h4>
                    <h6 class=" text-muted m-b-0">{{reg.code}}</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-file-text f-28"></i>
                    </div>
                </div>
                </div>
                <div :class="'card-footer bg-c-'+color[i]">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0">{{reg.name}}</p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-up text-white f-16"></i>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</span>
</template>

<script>
import FrontendService from '@/services/FrontendService'
export default {
  name: 'Dashboard',
  data () {
    return {
      auth: '',
      regiments: '',
      budget: '',
      color:['green','green','green','green','green','green','green','green','green','green','green','green','green','green'],
      hrm:0,
      acc:0,
      reg:0,
      singleModule:''
    }
  },
  mounted() {
    this.auth = this.$auth
    this.getData ()

  },

  methods: {
    async getData(){
      let reg = await FrontendService.regiment()
      this.regiments = reg.data
      let budget = await FrontendService.newBudget()
      this.budget = budget.data
      if(this.auth.role==='superadmin'){
        this.hrm = 1
        this.acc = 1
      }else if(this.auth.role==='admin'){
        this.hrm = 1
      }else if(this.auth.role==='accadmin'){
        this.acc = 1
      }else{
        this.reg = 1;
      }

    },
   async findData(){
      let moduleId = localStorage.getItem("module");
      if(moduleId!==null) {
        const mod = await FrontendService.singleModule(moduleId)
        this.singleModule = mod.data
      }
    }
  }
}
</script>

<style scoped>
  .secondTitle{visibility: visible}
</style>
