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
            <h4 class="card-title"> Bank Book </h4>
          </div>
          <div class="card-body table-responsive">
            <div class="row">
              <div class="col-md-3">
                <div class="row">
                  <label for="session_id" class="col-md-12"> Session </label>
                  <div class="col-md-12">
                    <select id="session_id" @change="showData" required class="form-control" v-model="form.session_id">
                      <option value="" selected> -select- </option>
                      <option v-for="(ses, indx) in session" :key="indx" :value="ses._id"> {{ses.name}} </option>
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
                  <h5><u> Bank Book of {{info.session}} </u></h5>
                  <h6><u> {{info.regiment}} <small>{{info.code}}</small> </u></h6>
                </div>
                <div class="table-responsive">
                  <table id="datatable" class="table table-striped table-bordered">
                    <thead>
                    <tr>
                      <th width="8%">Date</th>
                      <th> Voucher No </th>
                      <th> Head </th>
                      <th> Month </th>
                      <th>Details</th>
                      <th>Amount</th>
                      <th class="no-print">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(data,index) in allData" :key="index">
                      <td>{{data.expenditure_date.slice(0,10)}}</td>
                      <td>{{data.voucher_no}}</td>
                      <td>{{data.name}}</td>
                      <td>{{data.month | monthName}}</td>
                      <td>{{data.details}}</td>
                      <td>{{data.amount}}</td>
                      <td class="no-print"> <router-link tag="a" v-bind:to="{ name: 'bankBookShow', params: { id: data._id } }" class="btn btn-xs btn-info"><i class="fa fa-eye"></i></router-link> </td>
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
  import BankBookService from '@/services/acc/BankBookService'
  export default {
    name: 'FindWelfare',
    data () {
      return {
        form: {
          session_id: this.$auth.session,
        },
        allData: [],
        info: '',
        excelFileName: '',
        session: '',
        json_fields: {
          'Date': {
            field: 'expenditure_date',
            callback: (value) => {
              return value.slice(0,10);
            }
          },
          'Voucher No': 'voucher_no',
          'Head': 'name',
          'Month': 'month',
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
      this.showData(this.session_id)
    },
    methods: {
      async getData () {
        const sessions = await BankBookService.session()
        this.session = sessions.data
      },
      async showData() {
        const showResult = await BankBookService.index(this.form)
        this.allData = showResult.data.data
        this.info = showResult.data.info
        let i
        let newdata = []
        let headCount = Object.keys(this.allData).length;
        for(i=0;i<headCount;i++){
          newdata.push({
            expenditure_date: this.allData[i].expenditure_date,
            voucher_no: this.allData[i].voucher_no,
            name: this.allData[i].name,
            month: this.monthGet(this.allData[i].month),
            details: this.allData[i].details,
            amount: this.allData[i].amount
          })
        }
        this.json_data = newdata
        let a = this.info.session.replace(/ /g,"_").toLowerCase()
        let b = ''
        if(this.info.regiment){
          b = this.info.regiment.replace(/ /g,"_").toLowerCase()
        }
        this.excelFileName = a+'_'+b+'welfareFund.xls'
        console.clear()
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
