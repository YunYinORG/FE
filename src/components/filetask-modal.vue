<template>
  <modal show="{{@show}}" width="{{modalWidth}}" default-title="{{title}}">
    <div class="modal-body">
      <file-uploader 
        v-if="currentBody=='file-uploader'"
        file-list="{{@fileList}}"></file-uploader>
      <task-setting
        v-if="currentBody=='task-setting'"
        task-setting="{{@taskSetting}}"></task-setting>
    </div>
    <div class="modal-footer">
      <div v-if="currentBody=='file-uploader'">
        <button class="btn btn-primary btn-wide" v-on="click: onFinish">完成</button>
        <button class="btn btn-primary btn-wide" v-on="click: onToPrint">去打印</button>
      </div>
      <div v-if="currentBody=='task-setting'">
        <button v-if="newTask" class="btn btn-primary btn-wide" v-on="click: onCancelTask">取消任务</button>
        <button v-if="newTask" class="btn btn-primary btn-wide" v-on="click: onNewTask">提交任务</button>      
        <button v-if="!newTask" class="btn btn-primary btn-wide" v-on="click: onDeleteTask">删除任务</button>
        <button v-if="!newTask" class="btn btn-primary btn-wide" v-on="click: onModifyTask">修改任务</button>
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
    mode: String,
  },

  data: function() {
    return {
      modalWidth: 600,
      title: "请选择需要上传的文件",
      fileList: null,
      taskSetting: null,
      taskId: null,
      currentBody: '',
      newTask: true,
    }
  },

  compiled: function() {
    if(this.mode=="newfile") {
      this.fileList = []
      this.currentBody = 'file-uploader'
    } else if(this.mode="newtask") {
      this.fileList = []
      this.currentBody = 'task-setting'
    }
  },

  methods: {
    onFinish: function(e) {
      for(var i in this.params.fileList) {
        if(this.params.fileList[i].isuploading==true) {
          alert('请耐心等待文件上传完成，如出现上传时间过长请手动删除文件，我们会在近期加上进度显示 ^_^')
          return 'fail'
        }
      }    
      if(this.files.length>0) {
        this.onFileChange()
      }
      this.files = []
      this.show = false        
    },
    onToPrint: function(e) {

    }
  },

  components: {
    'modal': require('./modal.vue'),
    'file-uploader': require('./file-uploader.vue')
  }
}

// function getTaskInfo(vuemodel) {
//   yy_request.rest_api('get','task/'+vuemodel.taskID,null,function(status,info) {
//     if(status==1) {
//       vuemodel.printerID = info.pri_id
//       vuemodel.copies = parseInt(info.copies)
//       vuemodel.isColor = info.color==null? false:true
//       vuemodel.isDouble = info.isdouble==null? false:true
//       vuemodel.requirements = info.requirements
//       vuemodel.pfiles = [{name: info.filename}]
//     }
//   })
// }

// function addTask(vuemodel) {
//   for(var i in vuemodel.pfiles) {
//     var pf = vuemodel.pfiles[i]
//     var ajax_data = {
//       fid: pf.id,
//       pid: vuemodel.printerID,
//       copies: parseInt(vuemodel.copies),
//       color: vuemodel.isColor,
//       isdouble: vuemodel.isDouble,
//       // ppt: vuemodel.ppt,
//       requirements: vuemodel.requirements
//     }
//     yy_request.rest_api('post','task/',ajax_data,function(status,info){
//       if(status==1) {
//         vuemodel.submittedTaskNumber = vuemodel.submittedTaskNumber + 1
//       }
//     })
//   }
// }

// function modifyTask(vuemodel) {
//   var ajax_data = {
//     pid: vuemodel.printerID,
//     copies: parseInt(vuemodel.copies),
//     color: vuemodel.isColor,
//     isdouble: vuemodel.isDouble,
//     // ppt: vuemodel.ppt,
//     requirements: vuemodel.requirements
//   }
//   yy_request.rest_api('post','task/'+vuemodel.taskID,ajax_data,function(status,info){
//     if(status==1) {
//       vuemodel.submittedTaskNumber = vuemodel.submittedTaskNumber + 1
//     }
//   })
// }
</script>

<style>

</style>