<template>
  <div><a v-on='click: this.$parent.view = "print-view"'>打印管理</a></div>
  <div><a v-on="click: this.showUploadModal = true">上传文件</a></div>
  <div><a v-on='click: this.$parent.view = "file-view"'>文件管理</a></div>
  <div><a v-on='click: this.$parent.view = "share-view"'>文件分享</a></div>
  <div><a v-on='click: this.$parent.view = "textbook-view"'>教材课本</a></div>
  <div><a v-on='click: this.$parent.view = "user-view"'>用户信息</a></div>
    
  <upload-modal show="{{@showUploadModal}}"></upload-modal>

</template>

<script>
module.exports = {
  data: function () {
    return {
      showUploadModal:false,
    }
  },

  components: {
    'upload-modal': require('../components/upload-modal.vue'),
  }
}

</script>

<style>

</style>