<template>
  <modal show="{{@show}}" width="{{modalWidth}}" default-title="{{title}}">
    <div class="modal-body">
      <form class="form-horizontal" role="form">
        <div class="form-group">
          <div class='col-sm-9'><strong class="text-primary">{{fileForShare.name}}</strong></div>
          <div class="col-sm-3">
            <input type="checkbox" v-model="fileForShare.anonymous">
            <small class="text-info text-right">匿名分享</small>
          </div>
        </div>
        <div class="form-group">
          <label for="shareName" class="col-sm-2 control-label">分享名称</label>
          <div class="col-sm-10">
            <input id="shareName" type="text" placeholder='(可不填)给你的文件取个好认的名称' class="form-control" v-model="fileForShare.shareName"/>
          </div>          
        </div>          
        <div class="form-group">
          <label for="shareDesc" class="col-sm-2 control-label">文件描述</label>
          <div class="col-sm-10">
            <input id="shareDesc" type="text" placeholder='(可不填)帮助别人了解你的文件有什么用' class="form-control" v-model="fileForShare.shareDesc"/>
          </div>          
        </div>                
        <div class="form-group">
          <label for="shareTags" class="col-sm-2 control-label">文件标签</label>
          <div class="col-sm-10">
            <input id="shareTags" type="text" placeholder='(可不填)添加标签，以;号分隔' class="form-control" v-model="fileForShare.shareTags | tagDisplay"/>
          </div>          
        </div>
      </form>      
    </div>

    <div class="modal-footer">
      <button class="btn btn-primary btn-wide btn-warning" v-on="click: show = false">取消</button>
      <button v-if="fileForShare.sid==null" class="btn btn-primary btn-wide" v-on="click: onShare">分享</button>
      <button v-if="fileForShare.sid!=null" class="btn btn-primary btn-wide" v-on="click: onEdit">修改</button>
    </div>    
  </modal>
</template>

<script>

var yy_request = require('../js/yunyin_request')

module.exports = {
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true,
    },
    fileForShare: Object,
  },

  data: function () {
    return {
      modalWidth: 600,
      title: "分享文件",
    }
  },

  methods: {
    onShare: function() {
      var sfile = this.fileForShare
      var ajax_data = {
        fid: sfile.id,
        anonymous: sfile.anonymous
      }
      if(sfile.shareName!="") {
        ajax_data.name = sfile.shareName
      }
      if(sfile.shareDesc!="") {
        ajax_data.detail = sfile.shareDesc
      }
      yy_request.rest_api({
        method: 'post',
        api: 'share/',
        data: ajax_data,
        opSuccess: function(info) {
          for(var i in sfile.shareTags) {
            postTag(sfile.shareTags[i],info.id)
          }
        },
      })
    },

    onEdit: function() {
      
    }
  },

  components: {
    'modal': require('./modal.vue'),
  }
}


function postTag(tag,sfileId) {
  yy_request.rest_api({
    method: 'post',
    api: 'tags/',
    data: {"name":tag},
    opSuccess: function(info) {
      associateTag(info.id,sfileId)
    },
  })  
}

function associateTag(tagId,sfileId) {
  yy_request.rest_api({
    method: 'post',
    api: 'tags/' + tagId,
    data: {"sid":sfileId},
    opSuccess: function(info) {
      console.log(info)
    },
  })  
}


</script>

<style>
</style>