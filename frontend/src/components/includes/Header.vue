<template>
  <span class="dashboard">
      <div id="pcoded" class="pcoded">
      <div class="pcoded-container navbar-wrapper">
        <nav class="navbar header-navbar pcoded-header" style="position:fixed;">
          <top-navbar @status="onCollapse"></top-navbar>
        </nav>
        <div class="pcoded-main-container">
          <div class="pcoded-wrapper">
            <nav class="pcoded-navbar">
              <span class="menu-toggle-button" >
                <label class="switch"  title="Click here for menu collapse">
                  <input v-model="statusCheck" type="checkbox"  @click="collapseMobile">
                  <span class="slider round"></span>
                </label>
                <!--<i v-if="collapsed" class="fa fa-toggle-off"></i>
                <i v-else="" class="fa fa-toggle-on"></i>-->
              </span>
              <sidebar-menu :menu="menu" :width="'230px'" :collapsed="collapsed" @collapse="onCollapse" ></sidebar-menu>
            </nav>
            <div class="pcoded-content">
              <div class="page-header" v-bind:class="{'m-t-50': screenheight > 480}" style="text-align:center;">
                <div class="page-block">
                    <div class="row align-items-center">
                        <div class="col-md-12">
                            <div class="page-header-title" style="margin-top:-16px;margin-bottom:-10px;display: block">
                                <h4 class="m-b-10 logo-bncc"><img src="/static/images/BNCC-black.png"/></h4>
                            </div>
                            <div class="row">
                              <div class="col-sm-12">
                                <ul class="breadcrumb" style="float: left">
                                    <li class="breadcrumb-item">
                                    <a href="#">
                                      <i class="feather icon-home"></i>
                                    </a>
                                    </li>
                                    <li class="breadcrumb-item">
                                      <a href="#!">{{$route.meta.parent}}</a>
                                    </li>
                                    <li v-if="$route.meta.breadcrumb !== 'null'" class="breadcrumb-item">
                                      <a href="#!">{{$route.meta.breadcrumb}}</a>
                                    </li>
                                    <li v-if="$route.meta.breadcrumb2 !== 'null'" class="breadcrumb-item">
                                      <a href="#!">{{$route.meta.breadcrumb2}}</a>
                                    </li>
                                </ul>
                                <div style="display: block;float: right;margin-top: 10px;">
                                <button style="margin: 0 2px;" class="btn  btn-sm" :class="[ singleModule._id == module._id ? 'btn-success' : 'btn-primary' ]" @click="loadMenus(module._id)" v-for="module in modules" :key="module._id">{{module.name}}</button>
                              </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
              <div class="pcoded-inner-content" @click="mainBodyClick">
                <div class="main-body">
                  <div class="page-wrapper">
                    <div class="page-body">
                      <loading v-if="$root.loading"></loading>
                <router-view v-else :key="$route.fullPath"></router-view>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    <script2 type="text/javascript" src="/static/files/plugins/jquery/js/jquery.min.js"></script2>
     <script2 src="/static/files/assets/pages/waves/js/waves.min.js"></script2>
    <script2 type="text/javascript" src="/static/files/plugins/bootstrap/js/bootstrap.min.js"></script2>
    <script2 type="text/javascript" src="/static/files/plugins/jquery-slimscroll/js/jquery.slimscroll.js"></script2>

    <script2 src="/static/files/assets/js/pcoded.min.js"></script2>
    <script2 src="/static/files/assets/js/vertical/vertical-layout.min.js"></script2>
    <script2 type="text/javascript" src="/static/files/assets/js/script.min.js"></script2>
    <script2 type="text/javascript" src="/static/files/assets/js/custom.js"></script2>

  </span>
</template>

<script>
  import TopNavbar from '@/components/layouts/top-navbar'
  import LeftNavbar from '@/components/layouts/left-navbar'
  import Loading from '@/components/includes/Loading'
  import FrontendService from '@/services/FrontendService'

  export default {

    name: 'Header',
    data () {
      return{
        collapsed: false,
        screenheight: '',
        allModules: [],
        auth: '',
        modules: '',
        loadMenu: [],
        singleModule: {},
        menu: [],
        windowWidth: 0,
        statusCheck: true,
      }
    },

    components:{
      'top-navbar' : TopNavbar,
      'left-navbar': LeftNavbar,
      'loading': Loading,
    },
    mounted() {
      let token = localStorage.getItem("token");
      if(!token){
        this.$router.push({name: "login"})
      }
      this.auth = this.$auth
      this.getData ()
      this.$nextTick(function() {
        window.addEventListener('resize', this.getWindowWidth);
        //Init
        this.getWindowWidth()
      })

    },
    beforeDestroy() {
      window.removeEventListener('resize', this.getWindowWidth);
    },
    methods: {
      getWindowWidth(event) {
        this.windowWidth = document.documentElement.clientWidth;
        if(this.windowWidth<976){
          this.statusCheck = false
          this.collapsed = true
        }else{
          this.statusCheck = true
          this.collapsed = false
        }
      },
      mainBodyClick(){
        if(this.windowWidth<976){
          this.statusCheck = false
          this.collapsed = true
        }
      },
      onCollapse(val) {
        this.collapsed = val
      },
      collapseMobile() {
        if(this.collapsed===true){
          this.statusCheck = true
          this.collapsed = false
        }else{
          this.statusCheck = false
          this.collapsed = true
        }
      },
      async getData () {
        const module = await FrontendService.module()
        const response = await FrontendService.menu()
        this.allModules = response.data
        this.modules = module.data
        if(this.modules.length==1){
          localStorage.setItem('module', this.modules[0]._id)
        }
        let moduleId = localStorage.getItem("module");
        if(moduleId!==null){
          const mod = await  FrontendService.singleModule(moduleId)
          this.singleModule  = mod.data
          const loadMenus = await FrontendService.loadMenu(moduleId)
          this.loadMenu = loadMenus.data
        }
        this.getMenuData ()
      },
      getMenuData(){
        let menus = [
          {
            header: true,
            title: 'Main Navigation',
          },
          {
            href: '/',
            title: 'Dashboard',
            icon: 'feather icon-home',
          }
        ]
        if(this.loadMenu.length>0){
          for(let i in this.loadMenu){
            let module = {
              href: '/'+this.loadMenu[i].module.url,
              title: this.loadMenu[i].module.name,
              icon: this.loadMenu[i].module.icon_class,
            }
            let allMenu = this.loadMenu[i].menus
            if(allMenu.length>0){
              delete module.href;
              module.child = []

              for(let j in allMenu){
                let menuObject = {
                  href: '/'+allMenu[j].url,
                  title: allMenu[j].name,
                  icon: 'fa fa-angle-right'
                }
                module.child.push(menuObject)
              }

            }
            menus.push(module)
          }
        }
        if(this.allModules.length>0){
          for(let i in this.allModules){
            let module = {
              href: '/'+this.allModules[i].module.url,
              title: this.allModules[i].module.name,
              icon: this.allModules[i].module.icon_class,
            }
            let allMenu = this.allModules[i].menus
            if(allMenu.length>0){
              delete module.href;
              module.child = []

              for(let j in allMenu){
                let menuObject = {
                  href: '/'+allMenu[j].menu.url,
                  title: allMenu[j].menu.name,
                  icon: 'fa fa-angle-right'
                }
                let allSubMenu = allMenu[j].subMenu
                if(allSubMenu.length>0) {
                  delete menuObject.href;
                  menuObject.child = []

                  for (let k in allSubMenu) {
                    menuObject.child.push( {
                      href: '/'+allSubMenu[k].url,
                      title: allSubMenu[k].name
                    })
                  }
                }
                module.child.push(menuObject)
              }

            }
            menus.push(module)
          }
        }
        this.menu = menus
      },
      loadMenus(id){
        localStorage.setItem('module', id)
        this.getData ()
      }
    },
    created() {
      this.screenheight = screen.height;
    }
  }
</script>

<style>
  @import "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons";
  @import "../../../static/files/plugins/bootstrap/css/bootstrap.min.css";
  @import "../../../static/files/assets/pages/waves/css/waves.min.css";
  @import "../../../static/files/assets/css/style.css";
  @import "../../../static/files/assets/pages/j-pro/css/j-pro-modern.css";
  @import "../../../static/files/assets/css/pages.css";
  @import "../../../static/files/assets/css/widget.css";
  @import "../../../static/files/assets/icon/feather/css/feather.css";
  @import "../../../static/files/assets/icon/themify-icons/themify-icons.css";
  @import "../../../static/files/assets/icon/icofont/css/icofont.css";
  @import "../../../static/files/assets/icon/font-awesome/css/font-awesome.min.css";
  @import "../../../static/files/plugins/iziToast/iziToast.min.css";
  @import "../../../static/files/assets/css/custom.css";

  .switch {
    position: relative;
    display: inline-block;
    width: 41px;
    height: 21px;
    margin-top: 7px;
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
    height: 15px;
    width: 15px;
    left: 3px;
    bottom: 3px;
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
