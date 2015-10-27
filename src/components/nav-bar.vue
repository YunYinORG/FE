<template>
<!--   <header class="turn-left"
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
  </header> -->
  <!--aside-->
<!--   <aside v-el='aside'>
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
  </aside> -->
  <div id="header">
    <div class="nav-switch"
      v-on="click: toggleMenu">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
    <a class="signin" v-on="click: onClickLogin" v-text="username==null? '登录':username"></a>
    <a href='#/menu'><div class="logo"></div></a>
    <div class="clear"></div>
  </div>
  <div id="slide">
    <ul>
      <li v-repeat="nav in navs">
        <a href="nav.href" >{{nav.text}}</a>
      </li>
    </ul>
  </div>


</template>

<script>
module.exports = {
  methods: {
    onShowMenu: function() {
      this.$$.button.attributes['aria-expanded'] = true
      this.$$.menu.attributes['aria-expanded'] = true
      this.$$.button.classList.remove('collapsed')
      this.$$.menu.classList.remove('collapse')
      this.$$.menu.classList.add('collapsing')
    }
  }
}
</script>

<style>

</style>