<template>
  <header class="turn-left"
    v-el='header'>
    <a href='#/menu'><div class="logo"></div></a>
    <div class="nav-switch"
      v-on="click: toggleMenu">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
    <a class="signin" v-on="click: onClickLogin" v-text="username==null? '登录':username"></a>
    <div class="clear"></div>
  </header>
  <!--aside-->
  <aside v-el='aside'>
    <h6><a href="#/menu" v-on="click: hideAside">首页</a></h6>
    <h6>打印中心</h6>
    <ul>
      <li><a href="#/print" v-on="click: hideAside">打印</a></li>
      <li><a href="#" v-on="click: showUploadModal = true,
                            click: hideAside">上传</a></li>
      <li><a href="#/file" v-on="click: hideAside">文件</a></li>
    </ul>
    <h6>共享中心</h6>
    <ul>
      <li><a href="#">我的共享</a></li>
      <li><a href="#">所有共享</a></li>
    </ul>
    <h6><a href="#/book" v-on="click: hideAside">教材</a></h6>
    <h6><a href="#/user" v-on="click: hideAside">个人</a></h6>
    <h6><a href="#/card" v-on="click: hideAside">校园卡</a></h6>
    <h6><a href="#/printer" v-on="click: hideAside">打印店</a></h6>
  </aside>
  <section class="other"
    v-el="other">
    <component is="{{view}}"
      class="view"
      v-transition
      transition-mode="out-in">
    </component>
  </section>
  <footer class='text-center'>
      <ul class="list-inline">
        <li><a href="http://www.yunyin.org/">&copy;云印南天</a></li>
        <li><a rel="nofollow" href="#">打印店</a></li>
        <li><a href="">隐私声明</a></li>
        <li><a rel="nofollow" href="https://github.com/YunYinORG/print">开源项目</a></li>
        <li><a href="http://www.yunyin.org/pages/">文档中心</a></li>
        <li><a href="">新浪微博</a></li>
        <li><a href="">微信平台</a></li>
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

module.exports = {
  el: '#app',
  
  data: function () {
    return {
      view: '',
      showLoginModal: false,
      showFileTaskModal: false,
      showInfoModal: false,
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
    onClickLogin: function() {
      if(this.username==null) {
        this.showLoginModal = true
      } else {
        window.location.hash = "#/user"
      }
    },

    toggleMenu: function() {
      this.$$.aside.classList.toggle('open')
      this.$$.other.classList.toggle('slide-aside')
      this.$$.header.classList.toggle('slide-aside')
    },
    hideAside: function() {
      this.$$.aside.classList.remove('open')
      this.$$.other.classList.remove('slide-aside')
      this.$$.header.classList.remove('slide-aside')
    },
    onFileChange: function() {
      if(window.location.hash=="#/file") {
        window.location.reload()
      } else {
        window.location.hash="#/file"
      }
    },
    onTaskChange: function() {
      if(window.location.hash=="#/print") {
        window.location.reload()
      } else {
        window.location.hash="#/print"
      }
    }
  },

  compiled: function() {
    var vuemodel = this
    yy_request.rest_api('get','user/',null,function(status,info){
      if(status==1) {
        vuemodel.username = info.name
      } else {
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
    'textbook-view': require('./views/textbook-view.vue'),
    'user-view': require('./views/user-view.vue'),
    'login-modal': require('./components/login-modal.vue'),
    'filetask-modal': require('./components/filetask-modal.vue'),
    'info-modal': require('./components/info-modal.vue'),
  }
}
</script>

<style>
body {
  background-color: #00A6E9;
  color:#FEFEFE;
    position: relative;
    overflow-x: hidden;
}

a { 
  text-decoration: none;
    color: #13202c;
}

a:link {
    color: #13202c;
}

a:visited{
    color: #13202c;
}

header a:hover, footer a:hover{
    color: white;
}

a:hover{
    color: #1abc9c;
}

a:active {
    color: #13202c;
}


ul{
    list-style: none;
}

header {
    top: .1em;
    width: 100%;
    color: #bac1c8;
    position: relative;
    transition:0.25s ease-out;
    -webkit-transition:0.25s ease-out;
}

section {
    position: relative;
    transition:0.25s ease-out;
    -webkit-transition:0.25s ease-out;
}

.slide-aside {
    -webkit-transform: translateX(-200px);
    -moz-transform: translateX(-200px);
    -ms-transform: translateX(-200px);
    -o-transform: translateX(-200px);
    transform: translateX(-200px);
}



.clear{
    clear: both;
}

.logo {
  float: left;
    width: 55px;
    height: 55px;
    margin: -5px 0 0 10px;
    background: url(./img/logo_middle.svg) no-repeat center;
    background-size: 100%;
}

/*aside*/
.nav-switch{
  width: 32px;
    height: 32px;
    float: right;
    margin-top: 14px;
    margin-right: 14px;
    cursor: pointer;
}

.nav-switch > .line {
  height: 4px;
    border-radius: 1px;
    margin-bottom: 5px;
    background-color: #def;
}

.nav-switch:hover > .line {
    background-color: #FFF;
}

.nav-switch > div {
    width: 100%;
    height: 0;
    background-color: #ffffff;
    -webkit-transition: all 0.4s ease-in-out;
    -moz-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
}

.on-nav{
    padding-right: 200px !important;
}
.open{
    right: 0px !important;
}

aside{
    position:absolute;
    top: 0;
    height:100vh;
    right: -200px;
    width: 200px;
    background: #edeff1;
    min-height: 100%;
    transition:0.3s ease-out;
    -webkit-transition:0.2s ease-out;
}

aside > h6{
    margin-left:30px;
}

aside > ul{
    margin-left: 20px;
}

.signin {
    font-size: 20px;
    float: right;
    margin: 8px 40px 0 0;
    cursor: pointer;
}

.view {
  opacity: 1;
  position: absolute;
  -moz-transition: opacity 0.2s ease;
  -webkit-transition: opacity 0.2s ease;
  -o-transition: opacity 0.2s ease;
  transition: opacity 0.2s ease;
}

.view.v-enter {
  opacity: 0;
}

.view.v-leave {
  opacity: 0;
}

footer {
    width: 100%;
    background-color: #00A6E9;
    transition:0.25s ease-out;
    -webkit-transition:0.25s ease-out;
}

footer > ul{
    margin: 10px auto 10px auto;
}

footer a{
    color: #00A6E9;
}

body.modal-open {
  overflow: hidden;
}

</style>