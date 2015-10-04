<template>
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" aria-expanded="false"
        v-on="click: onShowMenu">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Brand</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" v-el="menu">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">打印 <span class="sr-only">(current)</span></a></li>
        <li><a href="#">文件</a></li>
        <li><a href="#">分享</a></li>
        <li><a href="#">课件</a></li>
      </ul>   
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#">登录云印</a></li>
      </ul>   
    </div><!-- /.navbar-collapse -->
   
  </div><!-- /.container-fluid -->
</nav>
</template>

<script>
module.exports = {
  methods: {
    onShowMenu: function() {
      this.$$.menu.classList.remove('collapse')
      this.$$.menu.classList.add('collapsing')
    }
  }
}
</script>

<style>

</style>