<template>
  <div class="menu-view">
    <div class="text-center">
      <h1>云印南天</h1>
    </div>
    <div class="text-center">
      <h3>make a Better campus!</h3>
    </div>
    <div class="text-center">
      <ul class="default-list">
        <li><a class="button" href="#/print">打印</a></li>
        <li><a class="button" v-on="click: onOpenFileTaskModal">上传</a></li>
        <li><a class="button" href="#/share">共享</a></li>
        <li><a class="button" href="#/book">教材</a></li>
        <li><a class="button" href="#/file">文件</a></li>
        <li><a class="button" href="#/user">个人</a></li>
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