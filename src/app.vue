<template>
  <header class="turn-left" v-class="slide-aside : showSlideMenu">
    <div class="nav-switch"
      v-on="click: showSlideMenu = !showSlideMenu">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
    <a href='#/home' class="logo"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="1417.32px" height="1417.32px" viewBox="0 0 1417.32 1417.32" enable-background="new 0 0 1417.32 1417.32" xml:space="preserve"><circle fill="#F3D759" stroke="#F3D759" stroke-width="0.25" stroke-miterlimit="10" cx="521.644" cy="748.74" r="186.655"/><circle fill="#FDFDFD" stroke="#FDFDFD" stroke-width="0.25" stroke-miterlimit="10" cx="817.723" cy="828.998" r="207.395"/><polygon fill="#2277AB" stroke="#2277AB" stroke-width="0.25" stroke-miterlimit="10" points="857.456,526.371 868.509,526.371 894.234,483.269 906.638,483.269 934.734,452.064 935.391,452.064 935.03,451.734 935.391,451.334 934.591,451.334 912.404,431.107 896.79,431.107 890.566,402.661 867.008,402.661 867.008,365.646 827.576,365.646 816.303,210.329 805.03,365.646 766.773,365.646 766.773,402.661 742.041,402.661 735.816,431.107 721.377,431.107 699.193,451.333 698.391,451.333 698.752,451.734 698.392,452.064 699.049,452.064 727.145,483.268 739.549,483.268 765.273,526.371 775.15,526.371 775.15,545.027 783.134,545.027 698.391,1203.805 935.381,1203.795 850.576,545.027 857.456,545.027 "/><path fill="#FDFDFD" stroke="#FDFDFD" stroke-width="0.25" stroke-miterlimit="10" d="M983.704,791.936 c-71.413,0-134.391,36.097-171.696,91.035c-16.33-86.422-92.221-151.791-183.391-151.791c-91.45,0-167.531,65.771-183.543,152.588 c-16.831-5.749-34.879-8.873-53.657-8.873c-91.633,0-165.916,74.283-165.916,165.916c0,82.642,60.424,151.16,139.5,163.813v0.639 h643.342c102.925-12.186,182.756-99.729,182.756-205.932C1191.099,884.79,1098.245,791.936,983.704,791.936z"/></svg></a>
    <a class="signin" v-on="click: onClickLogin" v-text="username==null? '登录':username"></a>
    <div class="clear"></div>
  </header>
  <!--aside-->
   <aside v-class="open : showSlideMenu"> 
   <h6><a href="#/home" v-on="click: showSlideMenu = false" >首页<i class="glyphicon glyphicon-home"></i></a></h6> 
   <h6><a href="#/print" >快速打印<i class="glyphicon glyphicon-print"></i></a></h6> 
   <h6>文件</h6>
   <ul> 
    <li><a href="#/print" v-on="click: showSlideMenu = false" >订单管理<i class="glyphicon glyphicon-list-alt"></i></a></li> 
    <li><a href="#" v-on="click: onUploadFile,
                            click: showSlideMenu = false" >上传文件<i class="glyphicon glyphicon-cloud-upload"></i></a></li> 
    <li><a href="#/file" v-on="click: showSlideMenu = false">我的文件<i class="glyphicon fui-folder"></i></a></li> 
   </ul> 
   <h6>资源</h6> 
   <ul> 
    <li><a href="#" >我的共享<i class="glyphicon glyphicon-star"></i></a></li> 
    <li><a href="#" >共享文库<i class="glyphicon glyphicon-globe"></i></a></li> 
    <li><a href="#" >店内资源<i class="glyphicon glyphicon-book"></i></a></li> 
   </ul> 
   <h6>个人</h6> 
   <ul> 
    <li><a href="#/user" v-on="click: showSlideMenu = false">个人信息<i class="glyphicon glyphicon-user"></i></a></li> 
    <li><a href="#" v-on="click: onLogout,click: showSlideMenu = false">退出登录<i class="glyphicon fui-exit"></i></a></li> 
   </ul> 
   <h6><a href="#/printer" v-on="click: showSlideMenu = false">打印店<i class="glyphicon fui-home"></i></a></h6> 
   <h6><a href="#/card" v-on="click: showSlideMenu = false">校园卡<i class="glyphicon fui-credit-card"></i></a></h6> 
  </aside>

  <section class="other" v-class="slide-aside : showSlideMenu">
    <component is="{{view}}"
      class="view"
      v-transition
      transition-mode="out-in">
    </component>
  </section>
  <footer class='text-center' v-class="slide-aside : showSlideMenu">
      <ul class="list-inline">
        <li><a target="_blank" href="http://www.yunyin.org/">&copy;云印南天</a></li>
        <li><a target="_blank" rel="nofollow" href="https://github.com/YunYinORG/">开源项目</a></li>
        <li><a target="_blank" href="http://www.yunyin.org/pages/">文档中心</a></li>
        <li><a target="_blank" href="http://weibo.com/cloudPrint/">新浪微博</a></li>
        <li><a href="#">微信</a></li>
        <li><a rel="nofollow" href="http://printer.yunyin.org/">打印店</a></li>
      </ul>
  </footer>
  <filetask-modal show="{{@showFileTaskModal}}"
    on-file-change="{{onFileChange}}"
    on-task-change="{{onTaskChange}}"
    params="{{fileTaskParams}}"></filetask-modal>
  <login-modal show="{{@showLoginModal}}"></login-modal>
  <info-modal show="{{@showInfoModal}}"
    info-text="{{infoModalText}}"></info-modal>
</template>

<script>
var yy_request = require('./js/yunyin_request')
var po = require('./js/public_object.js')

module.exports = {
  el: '#app',

  data: function () {
    return {
      view: '',
      showLoginModal: false,
      showFileTaskModal: false,
      showInfoModal: false,
      showSlideMenu: false,
      fileTaskParams: {
        mode: 'newfile',
        fileList: [],
        taskId: {},
      },
      infoModalText:'',
      mySelectOptions: [
        {value: 1, display: "这个打印店还不错哦"},
        {value: 2, display: "超级无敌打印店2"},
      ],
      mySelectValue: null,
      username: null,
    }
  },

  methods: {
    onUploadFile: function() {
      if(po.islogin) {
        this.fileTaskParams = {
          mode: 'newfile',
          fileList: [],
          taskId: {},
        }
        this.showFileTaskModal = true
      } else {
        this.showLoginModal = true
      }
    },

    onClickLogin: function() {
      if(this.username==null) {
        this.showLoginModal = true
      } else {
        window.location.hash = "#/user"
      }
    },

    onFileChange: function() {
      if(window.location.hash=="#/file") {
        po.vueFileList.onFileChange()
      } else {
        window.location.hash="#/file"
      }
    },

    onTaskChange: function() {
      if(window.location.hash=="#/print") {
        po.vueTaskList.onTaskChange()
      } else {
        window.location.hash="#/print"
      }
    },

    onLogout: function() {
      yy_request.rest_api({
        method: 'get',
        api: 'auth/logout',
        opSuccess: function(info) {
          po.islogin = false
          po.app.username = null
          window.location.hash = "#/home"
          po.app.showLoginModal = true 
        },
      })          
    },
  },

  compiled: function() {
    var vuemodel = this
    yy_request.rest_api({
    	method: 'get',
    	api: 'user/',
    	opSuccess: function(info) {
        po.islogin = true
    		vuemodel.username = info.name
    	},
    	opFail: function() {
        po.islogin = false
    		vuemodel.username = null
    	},
    	authFail: function() {
        po.islogin = false
    		vuemodel.username = null
    	}
    })
  },
  components: {
    'intro-view': require('./views/intro-view.vue'),
    'menu-view': require('./views/menu-view.vue'),
    'print-view': require('./views/print-view.vue'),
    'file-view': require('./views/file-view.vue'),
    'share-view': require('./views/share-view.vue'),
    'book-view': require('./views/book-view.vue'),
    'user-view': require('./views/user-view.vue'),
    'forget-view': require('./views/forget-view.vue'),
    'login-modal': require('./components/login-modal.vue'),
    'filetask-modal': require('./components/filetask-modal.vue'),
    'info-modal': require('./components/info-modal.vue'),
  }
}
</script>