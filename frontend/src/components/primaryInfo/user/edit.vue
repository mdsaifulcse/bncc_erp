<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header card-info">
            User information Edit
            <div class="card-btn pull-right">
              <router-link tag="a" to="/users" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View All</router-link>
            </div>
          </div>
          <div class="card-block">
            <form @submit.prevent="validateBeforeSubmit" enctype="multipart/form-data">
              <div class="j-wrapper j-wrapper-640">
                <div class="j-pro" id="j-pro">
                  <div class="j-content">
                    <!-- start name -->
                    <div class="row">
                      <div class="col-md-9">
                        <div class="j-unit">
                          <label class="j-label">Your name</label>
                          <div class="j-input">
                            <label class="j-icon-right" for="name">
                              <i class="icofont icofont-ui-user"></i>
                            </label>
                            <input type="text" required  id="name" v-model="form.name"  name="name" v-validate="'required'" :class="{'input': true, 'text-danger': errors.has('name') }">
                            <span v-show="errors.has('name')" class="help text-danger">{{ errors.first('name') }}</span>
                            <span v-if="validateErrors.name" class="help text-danger">{{validateErrors.name }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 employee-photo">
                        <strong v-show="errors.has('photo')" class="help text-danger">{{ errors.first('photo') }}</strong>
                        <label class="upload_photo profile pull-right" for="photo" >
                          <!--  -->
                          <img id="image_load" v-if="photoUrl" :src="photoUrl" style="width: 86px;height: 86px">
                          <img src="/static/images/default/photo.png" style="width: 86px;height: 86px" v-else="">
                        </label>
                        <input type="file" id="photo" v-validate="'mimes:image/*'" data-vv-as="image" ref="photo" name="photo" @change="selectPhoto()" style="display:none">

                      </div>
                    </div>
                    <!-- end name -->
                    <!-- start email phone -->
                    <div class="j-row">
                      <div class="j-span6 j-unit">
                        <label class="j-label">Your email</label>
                        <div class="j-input">
                          <label class="j-icon-right" for="email">
                            <i class="icofont icofont-envelope"></i>
                          </label>
                          <input type="email" required id="email" v-model="form.email" name="email" v-validate="'required|email'"  value="" :class="{'input': true, 'text-danger': errors.has('email') }">
                          <span class="j-tooltip j-tooltip-right-top">Email Address</span>
                          <span v-show="errors.has('email')" class="help text-danger">{{ errors.first('email') }}</span>
                          <span v-if="validateErrors.email" class="help text-danger">{{validateErrors.email }}</span>
                        </div>
                      </div>
                      <div class="j-span6 j-unit">
                        <label class="j-label">Phone/Mobile</label>
                        <div class="j-input">
                          <label class="j-icon-right" for="phone">
                            <i class="icofont icofont-phone"></i>
                          </label>
                          <input type="text" id="phone" v-model="form.mobile" name="mobile" v-validate="'required|min:11|max:11'" :class="{'input': true, 'text-danger': errors.has('mobile') }">
                          <span class="j-tooltip j-tooltip-right-top">Mobile Number</span>
                          <span v-show="errors.has('mobile')" class="help text-danger">{{ errors.first('mobile') }}</span>
                          <span v-if="validateErrors.mobile" class="help text-danger">{{validateErrors.mobile }}</span>
                        </div>
                      </div>
                    </div>

                    <div class="j-unit">
                      <label class="j-label">Address</label>
                      <div class="j-input">
                        <label class="j-icon-right" for="adults">
                          <i class="icofont icofont-location-pin"></i>
                        </label>
                        <input type="text" id="adults" v-model="form.address" name="address" v-validate="'required'" :class="{'input': true, 'text-danger': errors.has('address') }">
                        <span class="j-tooltip j-tooltip-right-top">Your Address</span>
                        <span v-show="errors.has('address')" class="help text-danger">{{ errors.first('address') }}</span>
                      </div>
                    </div>
                    <div class="j-row">
                      <div class="j-span6 j-unit">
                        <label class="j-label">Status</label>
                        <div class="j-input">
                          <select v-model="form.status" class="form-control" required>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div class="j-span6 j-unit">
                        <label class="j-label">HR Category</label>
                        <div class="j-input">
                          <select v-model="form.hr_category" class="form-control" required :options="category">
                            <option value=""> -select- </option>
                            <option :value="cat" v-for="(cat,ind) in category" :key="ind">{{cat}}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="j-row">
                      <div class="j-span6 j-unit">
                        <label class="j-label">Role</label>
                        <div class="j-input">
                          <select v-model="form.role" class="form-control" required>
                            <option value=""> -select- </option>
                            <option :value="role.slug" v-for="(role,ind) in roles" :key="ind">{{role.name}}</option>
                          </select>
                        </div>
                      </div>
                      <div class="j-span6 j-unit">
                        <label class="j-label">Division (If Any)</label>
                        <div class="j-input">
                          <select v-model="form.regiment_id" class="form-control">
                            <option value=""> -select- </option>
                            <option :value="reg._id" v-for="(reg,ind) in regiments" :key="ind">{{reg.name}}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="j-row">
                      <div class="j-span6 j-unit">
                        <label class="j-label">Designation</label>
                        <div class="j-input">
                          <select v-model="form.designation_id" class="form-control" required>
                            <option value=""> -select designation- </option>
                            <option :value="deg._id" v-for="(deg,ind) in designations" :key="ind">{{deg.designation}}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- end /.content -->
                  <div class="j-footer">
                    <button type="submit" class="btn btn-primary">Save change</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
export default {
  name: 'editUser',
  data () {
    return {
      form: {},
      validateErrors: [],
      roles: {},
      regiments: {},
      category: ['Army','Navy','Air','Civil'],
      designations: [],
      photoUrl:''
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const response = await UserService.show({
        id: this.$route.params.id
      })
      this.form = response.data
      let role = await UserService.roles()
      this.roles = role.data
      let regiment = await UserService.regiments()
      this.regiments = regiment.data
      let designation = await UserService.designations()
      this.designations = designation.data
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
            UserService.update(formData,this.$route.params.id)
              .then(success=>{
                this.$swal({
                  type: 'success',
                  title: 'Data Successfully Updated',
                  showConfirmButton: false,
                  timer: 1500
                })
                //this.$router.push({ name: 'users' })
              })
              .catch(err=>{
                this.validateErrors=err.response.data
              })
          }
        })
        .catch(function(e) {
          console.log('catch')
        })
    }
  }
}
</script>
<style></style>
