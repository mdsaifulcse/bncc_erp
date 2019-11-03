<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right"></div>
            <h4 class="card-title"> Find Termination </h4>
          </div>
          <div class="card-body table-responsive">
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label class="col-md-12">Select Division </label>
                  <div class="col-md-12">
                    <select class="form-control" @change="findData" v-model="regiment_id" >
                      <option value="">-select-</option>
                      <option v-for="reg in regiments" :value="reg._id"> {{reg.name}} </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label class="col-md-12">Select Session </label>
                  <div class="col-md-12">
                    <select class="form-control" v-model="session_id" @change="findData">
                      <option v-for="ses in sessions" :value="ses._id"> {{ses.name}} </option>
                    </select>
                  </div>
                </div>
              </div>

            </div>
            <div v-if="regiment_id!==''">
              <div class="col-sm-4 pull-right">
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </div>
              <v-data-table
                :headers="headers"
                :items="allData"
                :search="search"
                class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.employee.name_english }}</td>
                  <td>{{ props.item.employee.designation }}</td>
                  <td>{{ props.item.session.name }}</td>
                  <td>{{ props.item.month | monthName }}</td>
                  <td>{{ props.item.submit_date.slice(0,10) }}</td>
                  <td>
                    <router-link title="Click for view" tag="a" v-bind:to="{ name: 'showTermination', params: { id: props.item._id } }" class="btn btn-xs btn-success"><i class="fa fa-eye"></i></router-link>
                  </td>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                  Your search for "{{ search }}" found no results.
                </v-alert>
              </v-data-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import EmployeeService from '@/services/EmployeeService'
  import ReportService from '@/services/hr/ReportService'
  export default {
    name: 'findEmployee',
    data () {
      return {
        allData: [],
        search: '',
        headers: [
          {
            text: 'Employee',
            align: 'left',
            value: 'employee.name_english'
          },
          { text: 'Designation', value: 'employee.designation' },
          { text: 'Session', value: 'session.name' },
          { text: 'Month', value: 'month' },
          { text: 'Date', value: 'submit_date' },
          { text: 'Action', value: '_id' }
        ],
        regiments: [],
        sessions: [],
        regiment_id: '',
        session_id: this.$auth.session
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      async getData () {
        const regiment = await ReportService.regiments()
        this.regiments = regiment.data
        const session = await ReportService.session()
        this.sessions = session.data
      },
      async findData(){
        if(this.regiment_id!==''){
          const mainData = await ReportService.termination({regiment_id:this.regiment_id,session_id:this.session_id})
          this.allData = mainData.data
        }else{
          this.allData = []
        }
      },
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
