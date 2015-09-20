<template>
  <modal show="{{@show}}" width="{{modalWidth}}" default-title="{{title}}">
    <div class="modal-body">
      <div id="files-wrapper">
        <upload-file v-repeat="files" on-remove="{{removeFile}}"></upload-file>
      </div>
    </div>
    <div class="modal-footer">
      <div class="upload-btn">
        <div class="upload-area">点击上传文件</div>
        <input id="upload-file" type="file" name="file" accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation" v-on="change:uploadFiles" v-el="fileinput" multiple="multiple">
      </div>
      <input type="button" value="完成" v-on="click: onFinish">
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
    onFileChange: Function,
  },

  data: function () {
    return {
      modalWidth: 600,
      title: "请选择需要上传的文件",
      files: [],
    }
  },

  methods: {
    removeFile: function(index) {
      var filedata = this.files

      if("id" in filedata[index]) {
        yy_request.rest_api('delete','file/'+filedata[index].id+'/',null,function(status,info){
          if(status==1){
            filedata.$remove(index)
          } else {
            filedata[index].status = "删除失败，请重试"
          }
        })
      } else {
        filedata.$remove(index)
      }
          
    },

    uploadFiles: function(e) {
      var input_files = this.$$.fileinput.files
     
      for(var i = 0;i<input_files.length;i++) {
        var ifile = input_files[i]
        var filedata = {
          fileobject: ifile,
          status: "上传中",
        }

        this.files.push(filedata)
        uploadFile(filedata)

      }
    },

    onFinish: function(e) {
      this.show = false
      if(this.files.length>0) {
        this.onFileChange()
      }
      this.files = []    
    }
  },

  components: {
    'modal': require('./modal.vue'),
    'upload-file': require('./upload-file.vue')
  }
}

function uploadFile(filedata) {
  yy_request.rest_api('post','file/token/',{"name":filedata.fileobject.name},function(status,info){
    if(status==1) {
      filedata.token = info.token
      filedata.key = info.key
      yy_request.ajax({
        method: 'post',
        url: 'http://upload.qiniu.com/',
        data: {
          token: filedata.token,
          key: filedata.key,
          file: filedata.fileobject,
        },
        content: 'multipart',
        success: function(rs) {
          uploadConfirm(filedata,JSON.parse(rs).key)      
        },
        error: function(rs) {
          filedata.status = '上传失败'
        },
      })
    }
  })
}

function uploadConfirm(filedata,key) {
  yy_request.rest_api('post','file',{key:key},function(status,info){
    if(status==1) {
      filedata.status = '上传成功'
      filedata.id = info.id
    }
  })
}


</script>

<style>
.upload-btn{
  height: 40px;
  border-style: solid;
  border-width: 2px;
  background: #FFFFFF;
  position: relative;
}

.upload-area {
  text-align:center;
  padding-top: 7px;
  font-size: 15px;
  font-weight: 800;
}

#upload-file {
    cursor: pointer;
    font-size: 30px;
    outline: medium none;
    position: absolute;
    filter:alpha(opacity=0);
    -moz-opacity:0;
    opacity:0; 
    left: 0px;
    top: 0px;
}
</style>