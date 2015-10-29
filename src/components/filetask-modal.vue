<template>
  <modal show="{{@show}}" 
    width="{{modalWidth}}" 
    default-title="{{modalTitle}}">
    <div class="modal-body">
      <file-uploader 
        v-if="currentBody=='file-uploader'"
        file-list="{{@params.fileList}}"></file-uploader>
      <task-setting
        v-if="currentBody=='task-setting'"
        task-setting="{{@taskSetting}}"></task-setting>
    </div>
    <div class="modal-footer">
      <div v-if="currentBody=='file-uploader'">
        <div class="info-text text-left" v-transition="textshow" v-show="fileInfoText!=''">
          <small v-text="fileInfoText"></small>
        </div>   
        <button class="btn btn-primary btn-wide" v-on="click: onFinish">完成</button>
        <button class="btn btn-primary btn-wide" v-on="click: onToPrint">去打印</button>
      </div>
      <div v-if="currentBody=='task-setting'">
        <div class="info-text text-left" v-transition="textshow" v-show="taskInfoText!=''">
          <small v-text="taskInfoText"></small>
        </div>      
        <button v-if="newTask" class="btn btn-warning btn-wide" v-on="click: onCancelTask">取消任务</button>
        <button v-if="newTask" class="btn btn-primary btn-wide" v-on="click: onAddTasks">提交任务</button>      
        <button v-if="!newTask" class="btn btn-danger btn-wide " v-on="click: onDeleteTask">删除任务</button>
        <button v-if="!newTask" class="btn btn-primary btn-wide" v-on="click: onEditTask">修改任务</button>
      </div>
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
    onTaskChange: Function,
    params: Object,
  },

  data: function() {
    return {
      modalWidth: 600,
      taskSetting: {
        printerId: null,
        isInStore: true,
        isDoubleSide: false,
        isColor: false,
        copies: 1,
        requirements: "",
      },
      taskId: null,
      currentBody: '',
      fileInfoText: "",
      taskInfoText: "",
      stn: 0,
    }
  },

  computed: {
    modalTitle: function() {
      if(this.params.mode=="newfile") {
        return "请选择需要上传的文件"
      } else if(this.params.mode=="newtask") {
        return "请选择要去的打印店" 
      } else if(this.params.mode=="edittask") {
        getTaskSetting(this)
        return "请核对或修改您的打印任务"
      }
    },
    currentBody: function() {
      if(this.params.mode=="newfile") {
        return 'file-uploader'
      } else {
        return 'task-setting'
      }
    },
    newTask: function() {
      if(this.params.mode=="newtask") {
        return true
      } else {
        return false
      }
    },



    submittedTaskNumber: {
      get: function() {
        return this.stn
      },
      set: function(newValue) {
        var vuemodel = this
        this.stn = newValue
        if(newValue==this.params.fileList.length) {
          this.taskInfoText = "所有任务提交成功"
          setTimeout(function(){
            vuemodel.taskInfoText = ""
            vuemodel.show = false
            vuemodel.onTaskChange()
          },1000)
        }
      }
    },
  },

  methods: {
    onFinish: function(e) {
      for(var i in this.params.fileList) {
        if(this.params.fileList[i].isuploading==true) {
          alert('请耐心等待文件上传完成，如出现上传时间过长请手动删除文件，我们会在近期加上进度显示 ^_^')
          return 'fail'
        }
      }    
      if(this.params.fileList.length>0) {
        this.onFileChange()
      }
      // this.params.fileList[i] = []
      this.show = false        
    },

    onToPrint: function(e) {
      var count = 0
      for(var i in this.params.fileList) {
        if(this.params.fileList[i].issuccess==true) {
          count += 1
        }
      }    
      if(this.params.fileList.length==count) {
        this.params.mode="newtask"
      } else {
        this.fileInfoText = "请先等待文件上传完成或删除失败的文件"
      }
    },


    onAddTasks: function(e) {
      var ts = this.taskSetting
      var vuemodel = this
      var fileNumber = this.params.fileList.length
      
      var count = 0
      for(var i in this.params.fileList) {
        if(this.params.fileList[i].submitState=="done") {
          count += 1
        }
      }
      this.stn = count

      vuemodel.taskInfoText = "正在提交打印任务(1/" + fileNumber + ")"

      for(var i in this.params.fileList) {
        var pf = this.params.fileList[i]
        if(!("submitState" in pf) || pf.submitState=="fail") {
          var ajax_data = taskSettingToAjaxData(ts)
          ajax_data.fid = pf.id

          pf.submitState = "uploading"

          yy_request.rest_api({
            method: 'post',
            api: 'task/',
            data: ajax_data,
            opSuccess: function(info) {
              pf.submitState = "done"
              var temp_number = vuemodel.submittedTaskNumber + 1
              vuemodel.taskInfoText = "正在提交打印任务("+ temp_number +"/" + fileNumber + ")"
              vuemodel.submittedTaskNumber = temp_number
            },
            opFail: function(info) {
              pf.submitState = "fail"
              vuemodel.taskInfoText = "好像出现了点问题，请重试"
            },
          })
        }
      } 
    },

    onCancelTask: function() {
      if(this.params.fileList.length!=0){
        this.onFileChange()
        this.show = false 
      }
    },

    onDeleteTask: function() {
      var vuemodel = this
      vuemodel.taskInfoText="正在删除打印任务"

      yy_request.rest_api({
        method: 'delete',
        api: 'task/' + this.params.taskId,
        opSuccess: function(info) {
          vuemodel.taskInfoText="任务删除成功"
          setTimeout(function(){
            vuemodel.taskInfoText = ""
            vuemodel.show = false
            vuemodel.onTaskChange()
          },1000)
        },
        opFail: function(info) {
          vuemodel.taskInfoText="删除失败"
        },
      })
    },

    onEditTask: function() {
      var vuemodel = this
      vuemodel.taskInfoText = "正在修改打印任务"
      var ajax_data = taskSettingToAjaxData(vuemodel.taskSetting)

      yy_request.rest_api({
        method: 'put',
        api: 'task/' + this.params.taskId,
        data: ajax_data,
        opSuccess: function(info) {
          vuemodel.taskInfoText="任务修改成功"
          setTimeout(function(){
            vuemodel.taskInfoText = ""
            vuemodel.show = false
            vuemodel.onTaskChange()
          },1000)
        },
        opFail: function(info) {
          vuemodel.taskInfoText="删除失败"
        },
      })

    },

  },

  components: {
    'modal': require('./modal.vue'),
    'file-uploader': require('./file-uploader.vue'),
    'task-setting': require('./task-setting.vue')
  }
}

function getTaskSetting(vuemodel) {
  yy_request.rest_api({
    method: 'get',
    api: 'task/'+vuemodel.params.taskId,
    opSuccess: function(info) {
      vuemodel.taskSetting.printerId = info.pri_id
      vuemodel.taskSetting.copies = parseInt(info.copies)
      if(info.color==null && info.isdouble==null) {
        vuemodel.taskSetting.isInStore = true
      } else {
        vuemodel.taskSetting.isInStore = false
      }
      vuemodel.taskSetting.isColor = info.color==null? false:true
      vuemodel.taskSetting.isDoubleSide = info.isdouble==null? false:true
      vuemodel.taskSetting.requirements = htmldecode(info.requirements)
    },
  })
}

function taskSettingToAjaxData(taskSetting) {
  var ts = taskSetting
  var ajax_data = {
    pid: ts.printerId,
  }
  if(!ts.isInStore) {
    ajax_data.copies = parseInt(ts.copies)
    ajax_data.color = ts.isColor? '1':'0'
    ajax_data.isdouble = ts.isDoubleSide? '1':'0'
    ajax_data.requirements = ts.requirements
  }
  return ajax_data
}

function htmldecode(s) {
  var div = document.createElement('div')
  div.innerHTML = s
  return div.innerText || div.textContent
}

</script>

<style>
.modal-body {
  -webkit-transition: height .3s ease;
  -o-transition: height .3s ease;
  transition: height .3s ease;
}

.textshow-enter,
.textshow-leave {
   opacity: 0;
   -webkit-transition: all .3s ease;
   -o-transition: all .3s ease;
   transition: all .3s ease;
}

.info-text {
  float: left;
  width: 200px;
}

</style>