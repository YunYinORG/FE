<template>
  <div class="menu-view">
    <div class="text-center">
      <h2>云印服务</h2>
    </div>
    <div class="text-center">
      <h5>make a Better campus!</h5>
    </div>
    <div class="text-center">
      <ul class="default-list">
        <li><a class="button" title="快速打印" href="#/print"><i class="glyphicon glyphicon-print"></i>打印</a></li>
        <li><a class="button" title="上传文件到服务器上" v-on="click: onOpenFileTaskModal"><i class="fui-upload"></i>上传</a></li>
        <li><a class="button" title="查看和管理我的文件" href="#/file"><i class="fui-folder"></i>文件</a></li>
        <li><a class="button" title="共享的文件" href="#/share"><i class="glyphicon glyphicon-cloud"></i>共享</a></li>
      </ul>
    </div>
  </div>
</template>
<script>
module.exports = {
  methods: {
    onOpenFileTaskModal: function() {
      this.$parent.fileTaskParams = {
        mode: 'newfile',
        fileList: [],
        taskId: {},
      }
      this.$parent.showFileTaskModal = true
    }
  }
}
</script>