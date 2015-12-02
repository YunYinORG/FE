<template>
  <modal show="{{@show}}" width="{{modalWidth}}" default-title="{{title}}">
    <div class="modal-body">
      <div>
        <div v-repeat="file:sharedFileList">
            <form class="form-horizontal" role="form">
              <div class="form-group">
                <div class='col-xs-9'><strong class="text-primary">{{file.name}}</strong></div>
                <div class="col-xs-3">
                  <input type="checkbox" v-model="file.anonymous">
                  <small class="text-info text-right">匿名分享</small>
                </div>
              </div>
              <div class="form-group">
                <label for="shareName" class="col-sm-2 control-label">分享名称</label>
                <div class="col-sm-10">
                  <input id="shareName" type="text" placeholder='(可不填)给你的文件取个好认的名称' class="form-control" v-model="file.shareName"/>
                </div>          
              </div>          
              <div class="form-group">
                <label for="shareDesc" class="col-sm-2 control-label">文件描述</label>
                <div class="col-sm-10">
                  <input id="shareDesc" type="text" placeholder='(可不填)帮助别人了解你的文件有什么用' class="form-control" v-model="file.shareDesc"/>
                </div>          
              </div>                
              <div class="form-group">
                <label for="shareTags" class="col-sm-2 control-label">文件标签</label>
                <div class="col-sm-10">
                  <input id="shareTags" type="text" placeholder='(可不填)添加标签，以;号分隔' class="form-control" v-model="file.shareTags"/>
                </div>          
              </div>
            </div>
          </form>
        </div>       
      </div>
    </div>

    <div class="modal-footer">
      <button class="btn btn-primary btn-wide btn-warning" v-on="click: show = false">取消</button>
      <button class="btn btn-primary btn-wide" v-on="click: onShare">分享</button>
    </div>    
  </modal>
</template>

<script>

module.exports = {
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true,
    },
    sharedFileList: Array,
  },

  data: function () {
    return {
      modalWidth: 600,
      title: "分享文件",
    }
  },

  methods: {
    onShare: function() {

    }
  },

  components: {
    'modal': require('./modal.vue'),
  }
}


</script>

<style>
</style>