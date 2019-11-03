<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">
              <router-link tag="a" to="/employees/create" class="btn btn-primary btn-sm"><i class="fa fa-plus-circle"></i> Add New</router-link>

            </div>
            <h4 class="card-title"> Find Employees </h4>
          </div>
          <div class="card-body table-responsive">
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label class="col-md-12">Select Division </label>
                  <div class="col-md-12">
                    <select class="form-control" v-model="regiment_id" @change="getEmployee">
                      <option value="">-select-</option>
                      <option v-for="reg in regiments" :value="reg._id"> {{reg.name}} </option>
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
              :items="employees"
              :search="search"
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.name_english }}</td>
                <td>{{ props.item.personal_id }}</td>
                <td>{{ props.item.gender }}</td>
                <td>{{ props.item.nid }}</td>
                <td>{{ props.item.rank }}</td>
                <td>{{ props.item.designation }}</td>
                <td> <span v-if="props.item.status==1" class="text-success" title="Complete Employee Registration"><i class="fa fa-check-circle-o fa-2x"></i></span>
                  <span v-else class="text-danger" title="Incomplete Employee Registration"><i class="fa fa-times-circle-o fa-2x"></i></span></td>
                <td>
                  <router-link tag="a" v-bind:to="{ name: 'employeeShow', params: { id: props.item._id } }" class="btn btn-xs btn-info"><i class="fa fa-book" title="View profile with details "></i></router-link>
                  <router-link tag="a" v-bind:to="{ name: 'employeeEdit', params: { id: props.item._id } }" class="btn btn-xs btn-success"><i class="fa fa-edit" title="Click here to edit profile"></i></router-link>
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
        employees: [],
        search: '',
        headers: [
          {
            text: 'Name',
            align: 'left',
            value: 'name_english'
          },
          { text: 'Personal Number', value: 'personal_id' },
          { text: 'Gender', value: 'gender' },
          { text: 'National ID', value: 'nid' },
          { text: 'Rank', value: 'rank' },
          { text: 'Designation', value: 'designation' },
          { text: 'Status', value: 'status' },
          { text: 'Action', value: '_id' }
        ],
        regiments: [],
        regiment_id: ''
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      async getData () {
        const regiment = await ReportService.regiments()
        this.regiments = regiment.data
      },
      async getEmployee(){
        if(this.regiment_id!==''){
          const employee = await ReportService.employee(this.regiment_id)
          this.employees = employee.data
        }else{
          this.employees = []
        }
      },
    }
  }
</script>
<style></style>
