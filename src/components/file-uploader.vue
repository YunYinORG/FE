<template>
	<div id="files-wrapper">
		<upload-file v-repeat="fileList" on-remove="{{removeFile}}" on-upload="{{reuploadFile}}}"></upload-file>
	</div>
	<div class="upload-btn">
		<div class="upload-area">点击上传文件</div>
		<input v-if="hasFileInput" id="upload-file" type="file" name="file" accept="image/*,application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation" v-on="change:uploadFiles" v-el="fileinput" multiple="multiple">
	</div>		
</template>

<script>
	
var yy_request = require('../js/yunyin_request')

module.exports = {
  props: {
    fileList: Array,
  },

  data: function () {
    return {
      title: "请选择需要上传的文件",
      hasFileInput: true,
    }
  },

  methods: {
    removeFile: function(index) {
      var filedata = this.fileList

      if("id" in filedata[index]) {
        yy_request.rest_api({
          method: 'delete',
          api: 'file/'+filedata[index].id+'/',
          opSuccess: function(info) {
            filedata.$remove(index)
          },
          opFail: function(info) {
            filedata[index].info = "删除失败，请重试"
            filedata[index].status = "fail"
          },
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
          info: "上传中",
          status: "uploading",
        }

        this.fileList.push(filedata)
        uploadFile(filedata)

      }
      this.hasFileInput = false 
      this.hasFileInput = true //in case sometimes onChange Event will not be fired
    },

    reuploadFile: function(index) {
      var filedata = this.fileList[index]
      filedata.info = "上传中"
      filedata.status = "uploading"
      uploadFile(filedata)
    },

  },

  components: {
    'upload-file': require('./upload-file.vue')
  }
}

function uploadFile(filedata) {
  yy_request.rest_api({
    method: 'post',
    api: 'file/token/',
    data: {
      name: filedata.fileobject.name
    },
    opSuccess: function(info) {
      filedata.token = info.token

      yy_request.ajax({
        method: 'post',
        url: 'http://upload.qiniu.com/',
        data: {
          token: filedata.token,
          file: filedata.fileobject,
        },
        content: 'multipart',
        success: function(rs) {
          uploadConfirm(filedata,JSON.parse(rs).key)      
        },
        error: function(rs) {
          filedata.info = '上传失败'
          filedata.status = 'fail'
        },
      })
    },
  })
}

function uploadConfirm(filedata,key) {
  yy_request.rest_api({
    method: 'post',
    api: 'file/',
    data: {
      key: key,
    },
    opSuccess: function(info) {
      filedata.info = '上传成功'
      filedata.status = 'success'
      filedata.id = info.id
    },
    opFail: function(info) {
      filedata.info = info
      filedata.status = 'fail'
    },
  })
}

</script>

<style>
.upload-btn {
  height: 40px;
  border-style: solid;
  border-width: 2px;
  border-radius: 3px;  
  background: #ffffff;
  position: relative;
  margin-top: 20px;
  margin-bottom: 10px;
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
    width: 100%;
}
</style>