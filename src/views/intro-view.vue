<template>
  <h1>这里是介绍页</h1>
  <h2>云印是什么</h2>
  <hr>
  <h3>致力于为学生创造便捷的校园打印体验</h3>
  <hr>
  <button v-on="click: this.$parent.showLoginModal = true">立即使用</button>
</template>

<script>
module.exports = {
  data: function () {
    return {
      showLoginModal: false,
    }
  },

}

</script>

<style>

</style>