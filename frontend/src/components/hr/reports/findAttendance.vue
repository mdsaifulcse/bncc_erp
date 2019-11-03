<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right"></div>
            <h4 class="card-title"> Find Attendance </h4>
          </div>
          <div class="card-body table-responsive">
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label class="col-md-12">Select Division </label>
                  <div class="col-md-12">
                    <select class="form-control" v-model="regiment_id" @change="findData">
                      <option value="">-select-</option>
                      <option v-for="reg in regiments" :value="reg._id"> {{reg.name}} </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label class="col-md-12">Select Month </label>
                  <div class="col-md-12">
                    <select class="form-control" v-model="month">
                      <option v-for="(month, indx) in months" :key="indx" :value="indx"> {{month}} </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label class="col-md-12">Select Year </label>
                  <div class="col-md-12">
                    <input type="number" v-model="year" placeholder="Year" class="form-control">
                    <!--<select class="form-control" v-model="year">
                      <option v-for="(month, indx) in months" :key="indx" :value="indx"> {{month}} </option>
                    </select>-->
                  </div>
                </div>
              </div>
              <div class="col-md-1">
                <div class="form-group">
                  <label class="col-md-12">&nbsp;</label>
                  <div class="col-md-12">
                   <button @click="findData" type="button" class="btn btn-success btn-sm">Find</button>
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
                  <td>{{ props.item.attendance_date.slice(0,10) }}</td>
                  <td>{{ props.item.regiment.name }}</td>
                  <td>
                    <router-link tag="a" v-bind:to="'attendance/show?reg='+props.item.regiment_id+'&date='+props.item.attendance_date.slice(0,10)" title="Show for print" class="btn btn-xs btn-success"><i class="fa fa-eye"></i></router-link>
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
    name: 'findAttendance',
    data () {
      return {
        allData: [],
        search: '',
        headers: [
          {
            text: 'Date',
            align: 'left',
            value: 'attendance_date'
          },
          { text: 'Division', value: 'regiment.name' },
          { text: 'Action', value: '_id' }
        ],
        regiments: [],
        sessions: [],
        regiment_id: '',
        month: new Date().getMonth()+1,
        year: new Date().getFullYear(),
        months : { "1":"January", "2":"February", "3":"March", "4":"April", "5":"May", "6":"June",
        "7":"July", "8":"August", "9":"September", "10":"October", "11":"November", "12":"December" },
        years:[]
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
        if(this.year<2000){
          this.year = new Date().getFullYear()
        }
        if(this.regiment_id!==''){
          const mainData = await ReportService.attendance({regiment_id:this.regiment_id,month:this.month,year:this.year})
          this.allData = mainData.data
        }else{
          this.allData = []
        }
      }
    }
  }
</script>
<style></style>
