<script>
import UserService from '@/services/UserService'
import FrontendService from '@/services/FrontendService'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      info: '',
    }
  },
  mounted () {
    this.getData()
    if (localStorage.getItem('token') != null) {
      this.$router.go(-1)
    }
  },
  methods: {
    async getData(){
      let information = await FrontendService.info()
      this.info = information.data
      this.info.logo = this.$baseUrl+this.info.logo
    },
    async login () {
      await UserService.login({
        email: this.email,
        password: this.password
      }).then(res => {
        localStorage.setItem('token', res.data.token)
        this.$router.go({path: '/'})
      }).catch(error => {
        this.$iziToast.error({
          title: 'Error',
          message: error.response.data.message
        })
      })
    }
  }
}
</script>
<style>
@import "../../static/files/plugins/bootstrap/css/bootstrap.min.css";
@import "../../static/files/assets/pages/waves/css/waves.min.css";
@import "../../static/files/assets/css/style.css";
@import "../../static/files/assets/css/pages.css";
@import "../../static/files/assets/css/widget.css";
@import "../../static/files/assets/icon/feather/css/feather.css";
@import "../../static/files/plugins/iziToast/iziToast.min.css";
html,body,body > div,body > div > div ,body > div > div > div{
  height: 100%;
}
.login-right-logo{text-align: right;position: fixed;
  bottom: 20px;
  width: 100%;
  left: 0;}
.login-right-logo .container{text-align: right;}
.form-material .form-control{background-color: transparent !important;}
input:-webkit-autofill,
input:-webkit-autofill:focus,
input:-webkit-autofill:active  {
  -webkit-box-shadow: 0 0 0px 1000px #000 inset;
  transition: background-color 5000s ease-in-out 0s;
}
.btn.btn-primary.btn-md:hover{background: green;}
.login-block{
  background: url('/static/images/bg.jpg') no-repeat center;margin: 0;height: 100%;background-size:auto 100%
}
.auth-box.card{margin: 12% auto 0 auto;}
.top-first-logo{width:300px;height: auto;}
.bottom-logo{width: 200px;}
@media (max-width: 550px) {
  .bottom-logo{width: 150px;}
  .top-first-logo{width:220px;}
  .auth-box.card{margin: 20% auto 0 auto;}
  .login-right-logo{position: static;margin-top: 150px;}
  .login-block {
    background: url('/static/images/bg-mobile.jpg') no-repeat center;
  }
  .login-block .auth-box{width: 200px;}
  .login-right-logo .container {
    text-align: right;
  }
}
</style>
<template>
  <div>
    <section class="login-block" >
      <div class="container">
        <div class="row">
          <div class="col-sm-6">
            <img src="/static/images/bncc.png" class="img-responsive top-first-logo">
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <form id="inputForm" @submit.prevent="login">
            <div class="md-float-material form-material">
              <div class="auth-box card" style="background: none;max-width: 250px;z-index:99">
                <div class="card-block" style="background: rgba(221, 231, 255,.7);border-radius: 10px;">
                  <div class="form-group form-primary">
                    <input type="email" v-model="email" placeholder="Your Email Address" class="form-control" required>
                    <span class="form-bar"></span>
                  </div>
                  <div class="form-group form-primary">
                    <input type="password" placeholder="Password" v-model="password" class="form-control" required="">
                    <span class="form-bar"></span>
                  </div>
                  <div class="row m-t-25 text-left" style="display: none">
                    <div class="col-12">
                      <div class="checkbox-fade fade-in-primary d-">
                        <label>
                          <input type="checkbox" value="">
                          <span class="cr"><i class="cr-icon icofont icofont-ui-check txt-primary"></i></span>
                          <span class="text-inverse">Remember me</span>
                        </label>
                      </div>
                      <div class="forgot-phone text-right float-right">
                        <a href="" class="text-right f-w-600"> Forgot Password?</a>
                      </div>
                    </div>
                  </div>
                  <div class="row m-t-30">
                    <div class="col-md-12 text-center">
                      <button type="submit" style="border-radius:5px;" class="btn btn-primary btn-md">Sign in</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </form>
          </div>
          <!-- end of col-sm-12 -->
        </div>
        <div class="row">
          <div class="login-right-logo">
            <div class="container">
              <img src="/static/images/leamerp.png" class="img-responsive bottom-logo">
            </div>
          </div>
        </div>
        <!-- end of row -->
      </div>
      <!-- end of container-fluid -->
    </section>
  </div>
</template>
