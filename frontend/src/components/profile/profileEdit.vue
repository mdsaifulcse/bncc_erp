<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
            Profile
            <div class="card-btn pull-right">
              <router-link tag="a" to="/profile" class="btn btn-info btn-sm"> View Profile </router-link>
              <router-link tag="a" to="/profile/password" class="btn btn-primary btn-sm"> Change password </router-link>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-1"></div>
              <div class="col-md-10">
                <form @submit.prevent="validateBeforeSubmit" enctype="multipart/form-data">
                <div class="row">
                  <div class="col-lg-12 employee-photo">
                    <p style="text-align: right"> Click on photo for change it. </p>
                    <strong v-show="errors.has('photo')" class="help text-danger">{{ errors.first('photo') }}</strong>
                    <label class="upload_photo profile pull-right" for="photo" >
                      <!--  -->
                      <img id="image_load" v-if="photoUrl" :src="photoUrl" style="width: 86px;height: 86px">
                      <img src="/static/images/default/photo.png" style="width: 86px;height: 86px" v-else="">
                    </label>
                    <input type="file" id="photo" v-validate="'mimes:image/*'" data-vv-as="image" ref="photo" name="photo" @change="selectPhoto()" style="display:none">

                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-md-3 control-label"> Name: </label>
                  <div class="col-md-9">
                    <input type="text" v-model="form.name" class="form-control">
                    <span v-show="errors.has('name')" class="help text-danger">{{ errors.first('name') }}</span>
                    <span v-if="validateErrors.name" class="help text-danger">{{validateErrors.name }}</span>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-md-3 control-label"> Email: </label>
                  <div class="col-md-9">
                    <input type="text" v-model="form.email" class="form-control">
                    <span v-show="errors.has('email')" class="help text-danger">{{ errors.first('email') }}</span>
                    <span v-if="validateErrors.email" class="help text-danger">{{validateErrors.email }}</span>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-md-3 control-label"> Phone/Mobile: </label>
                  <div class="col-md-9">
                    <input type="text" v-model="form.mobile" class="form-control">
                    <span v-show="errors.has('mobile')" class="help text-danger">{{ errors.first('mobile') }}</span>
                    <span v-if="validateErrors.mobile" class="help text-danger">{{validateErrors.mobile }}</span>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-md-3 control-label"> Address: </label>
                  <div class="col-md-9">
                    <input type="text" v-model="form.address" class="form-control">
                    <span v-show="errors.has('address')" class="help text-danger">{{ errors.first('mobile') }}</span>
                    <span v-if="validateErrors.address" class="help text-danger">{{validateErrors.address }}</span>
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
          designation:{},
          division:{}
        },
        baseUrl:this.$baseUrl,
        photoUrl:'',
        validateErrors: [],
      }
    },
    mounted(){
      this.getData()
    },
    methods: {
      async getData(){
        let response = await ProfileService.profile()
        this.form = response.data
        this.photoUrl = this.$baseUrl+this.form.photo
      },
      selectPhoto () {
        this.form.photo = this.$refs.photo.files[0]
        this.photoUrl = URL.createObjectURL(this.$refs.photo.files[0])
      },
      async validateBeforeSubmit() {
        this.$validator.validateAll()
          .then(resp=>{
            if (resp){
              let formData = new FormData()
              /* Add the form data we need to submit */
              for (let key in this.form) {
                formData.append(key, this.form[key])
              }
              ProfileService.update(formData)
                .then(success=>{
                  console.log(success.data.token)
                  localStorage.removeItem('token')
                  localStorage.setItem('token', success.data.token)
                  this.$router.go({path: '/'})
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
