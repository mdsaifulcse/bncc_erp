<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
            Profile
            <div class="card-btn pull-right">
              <router-link tag="a" to="/profile" class="btn btn-primary btn-sm"> View Profile </router-link>
              <router-link tag="a" to="/profile/edit" class="btn btn-info btn-sm"> Edit Profile </router-link>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-1"></div>
              <div class="col-md-10">
                <form @submit.prevent="validateBeforeSubmit">

                  <div class="form-group row">
                    <label class="col-md-3 control-label"> Old Password: </label>
                    <div class="col-md-9">
                      <input type="password" required v-validate="'min:6|max:12'" name="oldpassword" id="old_password" v-model="form.oldpassword" class="form-control">
                      <span v-show="errors.has('oldpassword')" class="help text-danger">{{ errors.first('oldpassword') }}</span>
                      <span v-if="validateErrors.oldpassword" class="help text-danger">{{validateErrors.oldpassword }}</span>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-md-3 control-label"> New Password: </label>
                    <div class="col-md-9">
                      <input type="password" required class="form-control" v-validate="'min:6|max:12'" name="password" id="password" v-model="form.password" ref="password" :class="{'input': true, 'text-danger': errors.has('password')}">
                      <span v-show="errors.has('password')" class="help text-danger">{{ errors.first('password') }}</span>
                      <span v-if="validateErrors.password" class="help text-danger">{{validateErrors.password }}</span>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-md-3 control-label"> Confirm Password: </label>
                    <div class="col-md-9">

                      <input type="password" required  id="cpassword" v-model="form.password_confirmation" v-validate="'confirmed:password'" class="form-control" name="password_confirmation" data-vv-as="password" >
                      <span v-show="errors.has('password_confirmation')" class="help help-block text-danger">{{ errors.first('password_confirmation') }}</span>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-md-3 control-label"> </label>
                    <div class="col-md-9">
                      <button type="submit" class="btn btn-primary">Save change</button>
                    </div>
                  </div>
                </form>
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
          oldpassword:'',
          password: '',
          password_confirmation: '',
        },
        baseUrl:this.$baseUrl,
        photoUrl:'',
        validateErrors: [],
      }
    },
    mounted(){

    },
    methods: {
      getData() {
        this.form = {
          oldpassword:'',
          password: '',
          password_confirmation: '',
        }
        this.validateErrors = []
      },
      async validateBeforeSubmit() {
        this.$validator.validateAll()
          .then(resp=>{
            if (resp){
              ProfileService.passChange(this.form)
                .then(success=>{
                  this.getData()
                  this.$swal({
                    type: 'success',
                    title: 'Data Successfully Updated',
                    showConfirmButton: false,
                    timer: 1500
                  })
                })
                .catch(err=>{
                  this.validateErrors=err.response.data
                })
            }
          })
          .catch(function(e) {
            console.log(e)
          })
      }
    }
  }
</script>
<style></style>
