<template>
  <div class="menu-view">
    <div class="text-center">
      <h2>云印服务</h2>
    </div>
    <div class="text-center">
      <h5>随时随地更方便的校园打印</h5>
    </div>
    <div class="text-center">
      <ul class="default-list">
        <li><a class="button" title="快速打印" href="#/print"><i class="glyphicon glyphicon-print"></i>打印</a></li>
        <li><a class="button" title="上传文件到服务器上" v-on="click: onOpenFileTaskModal"><i class="glyphicon glyphicon-cloud-upload"></i>上传</a></li>
        <li><a class="button" title="查看和管理我的文件" href="#/file"><i class="fui-folder"></i>文件</a></li>
        <li><a class="button" title="共享的文件" href="#/share"><i class="glyphicon glyphicon-globe"></i>共享</a></li>
      </ul>
    </div>
  </div>
    <footer class='text-center' v-class="slide-aside : showSlideMenu">
      <ul class="list-inline">
        <li><a target="_blank" href="http://www.yunyin.org/">&copy;云印南天</a></li>
        <li><a target="_blank" rel="nofollow" href="https://github.com/YunYinORG/">开源项目</a></li>
        <li><a target="_blank" href="http://www.yunyin.org/pages/">文档中心</a></li>
        <li><a target="_blank" href="http://weibo.com/cloudPrint/">新浪微博</a></li>
        <li><a href="#">微信</a></li>
        <li><a rel="nofollow" href="http://printer.yunyin.org/">打印店</a></li>
      </ul>
  </footer>
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