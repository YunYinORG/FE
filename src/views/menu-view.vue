<template>
  <div class="menu-view">
    <div class="text-center">
      <h3>云印南天</h3>
    </div>
    <div class="text-center">
      <h6>总觉得这里还该放点什么话</h6>
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

<style>
.menu-view {
  position: relative;
}

.button{
    color: #22252C;
    border-radius: 17px;
    display: inline-block;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 0.875em;
    padding: 8px 150px;
    border: 2px solid;
}


.default-list{
    padding-left: 0;
}

.default-list > li{
    margin: 10px 0 10px 0;
    font-size: 23px;
}

.default-list > li > a:hover{
    color: white;
}
</style>