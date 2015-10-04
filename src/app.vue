<template>
  <nav-bar></nav-bar>
  <component is="{{view}}"
    keep-alive
    v-transition
    trnsition-mode="out-in">
  </component>
  <login-modal show="{{@showLoginModal}}"></login-modal>
</template>

<script>
module.exports = {
  el: '#app',
  data: function () {
    return {
      view: 'intro-view',
      showLoginModal: false,
    }
  },
  components: {
    'intro-view': require('./views/intro-view.vue'),
    'home-view': require('./views/home-view.vue'),
    'login-modal': require('./components/login-modal.vue'),
    'nav-bar': require('./components/nav-bar.vue'),
  }
}
</script>

<style>
body {
  background-color: #1abc9c;
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
    background-color: #13202c;
}

.nav-switch:hover > .line {
    background-color: white;
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
    bottom: 0;
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

</style>