<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">
              <router-link tag="a" to="/employees/create" class="btn btn-primary btn-sm"><i class="fa fa-plus-circle"></i> Add New</router-link>

            </div>
            <h4 class="card-title"> All Employees </h4>
          </div>
          <div class="card-body table-responsive">
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
              :pagination.sync="pagination"
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
                <td width="12%">
                  <router-link tag="a" v-bind:to="{ name: 'employeeShow', params: { id: props.item._id } }" class="btn btn-xs btn-info"><i class="fa fa-book" title="View profile with details "></i></router-link>
                  <router-link tag="a" v-bind:to="{ name: 'employeeEdit', params: { id: props.item._id } }" class="btn btn-xs btn-success"><i class="fa fa-edit" title="Click here to edit profile"></i></router-link>
                  <button class="btn btn-xs btn-danger" @click="deleteEmployee(props.item._id, index)" title="Click here to delete this "> <i class="fa fa-trash"></i> </button>
                </td>
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
              </v-alert>
            </v-data-table>
            <div class="text-xs-center pt-2">
              <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
            </div>
            <div class="pull-right">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import EmployeeService from '@/services/EmployeeService'
  export default {
    name: 'findEmployee',
    data () {
      return {
        employees: [],
        search: '',
        pagination: {},
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
        desserts: []
      }
    },
    computed: {
      pages () {
        if (this.pagination.rowsPerPage === null ||
          this.pagination.totalItems === null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    },
    mounted () {
      this.getEmployee()
    },
    methods: {
      async getEmployee () {
        const response = await EmployeeService.index()
        this.employees = response.data
      },
      async deleteEmployee (id, i) {
        const $this = this
        $this.$swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(function (result) {
          if (result.value) {
            EmployeeService.destroy(id)
              .then(success => {
                $this.employees.splice(i, 1)
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
      }
    }
  }
</script>
<style></style>
