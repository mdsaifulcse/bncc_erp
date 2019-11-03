<template>
  <div class="navbar-wrapper">
    <div class="navbar-logo">
      <a class="mobile-menu waves-effect waves-light" id="mobile-collapse" href="javascript:void(0)" @click="onCollapse()">
        <label class="switch"  title="Click here for menu collapse">
          <input v-model="statusCheck" type="checkbox" >
          <span class="slider round"></span>
        </label>
      </a>
      <router-link to="/">
        <img class="img-fluid erp-logo" :src="info.logo" :alt="info.company_name"/>

      </router-link>
      <img class="img-responsive favicon-logo-mobile" v-if="scrolled>55" style="width: 35px;margin-left: 40px;margin-top: -8px;" src="/static/images/favicon.png"/>
      <a class="mobile-options waves-effect waves-light">
        <i class="feather icon-more-horizontal text-custom"></i>
      </a>
    </div>
    <div class="navbar-container container-fluid">
      <ul class="nav-left">
        <li class="header-search" style="display: none">
          <div class="main-search morphsearch-search">
            <div class="input-group">
              <span class="input-group-prepend search-close">
                <i class="feather icon-x input-group-text text-custom"></i>
              </span>
              <input type="text" class="form-control" placeholder="Enter Keyword">
              <span class="input-group-append search-btn">
                <i class="feather icon-search input-group-text" style="color:black"></i>
              </span>
            </div>
          </div>
        </li>
        <li>
          <a onclick="javascript:toggleFullScreen()" class="waves-effect waves-light">
            <i class="full-screen feather icon-maximize text-custom"></i>
          </a>
        </li>
      </ul>
      <div class="top-header-logo" v-if="scrolled>55"> <img src="/static/images/BNCC-black.png"/> </div>
      <ul class="nav-right">
        <li class="user-profile header-notification" style="width:100%;">

          <div class="dropdown-primary dropdown">
            <div class="dropdown-toggle" data-toggle="dropdown">
              <img v-if="auth.photo && auth.photo!==''" :src="baseUrl+auth.photo" class="img-radius" :alt="auth.name">
              <i v-else="" class="fa fa-user-circle" style="font-size: 18px;"></i>
              <span class="text-custom" style="font-size: 12px;">{{auth.name}} <small class="top-designation">{{auth.designation}}</small></span>

              <i class="feather icon-chevron-down text-custom profile-carret"></i>
            </div>
            <ul class="show-notification profile-notification dropdown-menu" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">
              <li><router-link to="/profile"> <i class="fa fa-user"></i> Profile </router-link> </li>
              <li>
                <a href="" @click="logout()">
                  <i class="feather icon-log-out"></i> Logout
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li class="only-mobile">
          <a href="" @click="logout()" style="color: orangered;">
            <i class="feather icon-log-out"></i><b> Logout</b>
          </a>
        </li>
        <li class="only-mobile"><router-link to="/profile" style="color: blue"> <i class="fa fa-user"></i> Profile </router-link> </li>

      </ul>
    </div>
  </div>
</template>

<script>
  import FrontendService from '@/services/FrontendService'
  import VueJwtDecode from 'vue-jwt-decode'
  export default {
    name: "top-navbar",
    data () {
      return{
        auth: '',
        info: '',
        baseUrl: this.$baseUrl,
        scrolled:0,
        status: false,
        statusCheck: true,
      }
    },
    mounted() {
      let token = localStorage.getItem("token");
      if(!token){
        this.$router.push({name: "login"})
      }
      this.auth = this.$auth
      this.getData();
      this.$nextTick(function() {
        window.addEventListener('resize', this.getWindowWidth);
        //Init
        this.getWindowWidth()
      })
    },
     beforeDestroy() {
      window.removeEventListener('resize', this.getWindowWidth);
    },
    created () {
      window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      getWindowWidth(event) {
        this.windowWidth = document.documentElement.clientWidth;
        if(this.windowWidth<976){
          this.status = true
        }else{
        this.status = false
        }
      },
      logout() {
        localStorage.removeItem('token')
        this.$router.push({name: "login"})
      },
      handleScroll () {
        this.scrolled = window.scrollY;
        console.log({scroll:this.scrolled})
      },
      onCollapse(){
        if(this.status===true){
          this.status=false
          this.statusCheck=true
        }else{
          this.status=true
          this.statusCheck=false
        }
        /*let val = $('#mobile-collapse').children('i')
        let className = val[0].className
        let arr  = className.replace('feather ','');
         arr  = arr.replace('text-custom','');
         arr  = arr.replace(' ','');
          if(this.windowWidth<976){
            if(arr === 'icon-toggle-left'){
             this.status=true
           }else{
             this.status=false;
           }
          }else{
            if(arr === 'icon-toggle-right'){
             this.status=true
           }else{
             this.status=false;
           }
          }*/

        this.$emit('status', this.status)
      },
      async getData(){
        let information = await FrontendService.info()
        this.info = information.data
        this.info.logo = this.$baseUrl+this.info.logo
        this.info.favicon = this.$baseUrl+this.info.favicon
      }
    }
  }
</script>

<style>
  .switch {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 15px;
    margin-top: 16px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 11px;
    width: 11px;
    left: 0px;
    bottom: 2px;
    background-color: #FFA500;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #fff;
  }

  input:focus + .slider {
    box-shadow: 0;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(20px);
    -ms-transform: translateX(20px);
    transform: translateX(20px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>
