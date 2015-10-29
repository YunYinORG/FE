<template>
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