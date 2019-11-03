<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
           Profile
            <div class="card-btn pull-right">
              <router-link tag="a" to="/profile/edit" class="btn btn-info btn-sm"> Edit Profile </router-link>
              <router-link tag="a" to="/profile/password" class="btn btn-primary btn-sm"> Change password </router-link>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-1"></div>
              <div class="col-md-10">
                <div class="photo pull-right">
                  <img :src="$baseUrl+form.photo" style="width: 150px;" class="img-responsive" >
                </div>
                <div class="table-responsive">
                  <table class="table table-bordered">
                    <tr>
                      <th width="20%" class="text-right"> Name: </th>
                      <td> {{form.name}} </td>
                    </tr>
                    <tr>
                      <th width="20%" class="text-right"> Email: </th>
                      <td> {{form.email}} </td>
                    </tr>
                    <tr>
                      <th width="20%" class="text-right"> Phone/Mobile: </th>
                      <td> {{form.mobile}} </td>
                    </tr>
                    <tr>
                      <th width="20%" class="text-right"> Designation: </th>
                      <td> {{form.designation.designation}} </td>
                    </tr>
                    <tr>
                      <th width="20%" class="text-right"> Address: </th>
                      <td> {{form.address}} </td>
                    </tr>
                    <tr v-if="form.division.name">
                      <th width="20%" class="text-right"> Division: </th>
                      <td> {{form.division.name}} </td>
                    </tr>
                    <tr>
                      <th width="20%" class="text-right"> Role: </th>
                      <td> {{form.role}} </td>
                    </tr>
                    <tr>
                      <th width="20%" class="text-right"> HR Category: </th>
                      <td> {{form.hr_category}} </td>
                    </tr>

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
  import ProfileService from '@/services/ProfileService'
  export default {
    name: 'Profile',
    data () {
      return {
        form:{
          designation:{},
          division:{},
          photo:''
        },
        baseUrl:this.$baseUrl
      }
    },
    mounted(){
      this.getData()
    },
    methods: {
      async getData(){
       let response = await ProfileService.profile()
        this.form = response.data
        console.clear()
      },
    }
  }
</script>
<style></style>
