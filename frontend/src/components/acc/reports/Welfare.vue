<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">
              <div  v-if="info != '' ">
                <download-excel
                  class   = "btn btn-xs btn-success"
                  :data   = "json_data"
                  :fields = "json_fields"
                  :name    = "excelFileName">
                  <i class="fa fa-file-excel-o"></i> Excel
                </download-excel>
                <button class="btn btn-xs btn-primary" v-print="'#printThis'"><i class="fa fa-print"></i> Print</button>
              </div>
            </div>
            <h4 class="card-title">Find Welfare</h4>
          </div>
          <div class="card-body table-responsive">
            <div class="row">
              <div class="col-md-4">
                <div class="row">
                  <label for="regiment_id" class="col-md-12"> Division </label>
                  <div class="col-md-12">
                    <select id="regiment_id" @change="showData" required class="form-control" v-model="regiment_id">
                      <option value="" selected> -select- </option>
                      <option v-for="(reg, indx) in regiments" :key="indx" :value="reg._id"> {{reg.name}} </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <br>

            <div id="printThis">
              <div  v-if="info != '' ">
                <div class="text-center">
                  <print-header></print-header>
                  <h4> Welfare fund {{info.session}} </h4>
                  <h6><u> {{info.regiment}} <small>{{info.code}}</small> </u></h6>
                </div>
                <div class="table-responsive">
                  <table id="datatable" class="table table-striped table-bordered">
                    <thead>
                    <tr>
                      <th width="5%">Date</th>
                      <th> Voucher No </th>
                      <th> Month </th>
                      <th>Details</th>
                      <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(data,index) in allData" :key="index">
                      <td>{{data.submit_date.slice(0,10)}}</td>
                      <td>{{data.voucher_no}}</td>
                      <td>{{data.month | monthName}}</td>
                      <td>{{data.details}}</td>
                      <td>{{data.amount}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import PrintHeader from '@/components/pad/Header'
  import BudgetReportsService from '@/services/acc/reports/BudgetReportsService'
  export default {
    name: 'FindWelfare',
    data () {
      return {
        regiment_id: '',
        allData: [],
        info: '',
        excelFileName: '',
        regiments: '',
        json_fields: {
          'Date': {
            field: 'submit_date',
            callback: (value) => {
              return value.slice(0,10);
            }
          },
          'Voucher No': 'voucher_no',
          'Month':'month',
          'Details': 'details',
          'Amount': 'amount',
        },
        json_data: [],
        json_meta: [
          [
            {
              'key': 'charset',
              'value': 'utf-8'
            }
          ]
        ],
      }
    },
    components:{
      'print-header': PrintHeader
    },
    mounted () {
      this.getData()
    },
    methods: {
      async getData () {
        let regiment = await BudgetReportsService.regiments()
        this.regiments = regiment.data
        if(this.$route.params.id){
          this.regiment_id = this.$route.params.id
          this.showData()
        }
      },
      async showData() {
        const showResult = await BudgetReportsService.welfare(this.regiment_id)
        this.allData = showResult.data.data
        this.info = showResult.data.info
        let i
        let newdata = []
        let headCount = Object.keys(this.allData).length;
        for(i=0;i<headCount;i++){
          newdata.push({
            submit_date: this.allData[i].submit_date,
            voucher_no: this.allData[i].voucher_no,
            month: this.monthGet(this.allData[i].month),
            details: this.allData[i].details,
            amount: this.allData[i].amount,
          })
        }
        this.json_data = newdata
        let a = this.info.session.replace(/ /g,"_").toLowerCase()
        let b = ''
        if(this.info.regiment){
          b = this.info.regiment.replace(/ /g,"_").toLowerCase()
        }
        this.excelFileName = a+'_'+b+'welfareFund.xls'
      },
      monthGet(i){
        var monthNames = [ "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December" ];
        let ind = i-1;
        return monthNames[ind]
      }


    },
    filters:{
      monthName: function (value) {
        var monthNames = [ "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December" ];
        let ind = value-1;
        return monthNames[ind]

      }
    }
  }
</script>
<style></style>
