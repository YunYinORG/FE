<template>
  <div class="row actions-wrapper">
    <div class="col-xs-12 col-sm-8 text-center">
      <button class="btn btn-embossed btn-primary" v-on="click: onUploadFile">
        <i class="glyphicon glyphicon-open"></i>
        添加新打印任务
      </button>
    </div>
    <div class="hidden-xs col-sm-3 col-sm-offset-1">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="搜索您的文件" v-model="searchString">
        <span class="input-group-btn">
          <button class="btn"><i class="fui-search"></i></button>
        </span>
      </div>
    </div>
  </div>
  <div class="table-responsive">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>状态</th>
          <th>任务名</th>
          <th>打印店</th>
          <th>设置</th>
          <th>时间</th>       
          <th>操作</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <template v-repeat="task:displayTask" track-by="id">
          <tr>
            <td>{{task.status}}</td>
            <td class="text-primary">{{task.name}}</td>
            <td>{{task.printer}}</td>
            <td><span>{{task.copies}}</span>份<span>{{task.double==null? " ":(task.double=="1"? "双面":"单面")}}</span><span>{{task.color==null? "-": (task.color=="1"? "彩色":"黑白")}}</span></td>
            <td>{{task.time.substr(5,11)}}</td>
            <td style="text-align:center">
              <i class="glyphicon glyphicon-pencil" aria-hidden="true" style="cursor:pointer"
                v-on="click: onEditTask($event,task)"></i>
            </td>
          </tr>
        </template>
      </tbody>
    </table>  
  </div>

  <div class="more" v-on="click: onLoadMore" v-if="moreData">加载更多...</div><!--没有更多时应为灰色-->
</template>

<script>
var yy_request = require('../js/yunyin_request')
var po = require('../js/public_object.js')

module.exports = {

  data: function() {
  	return {
  		displayedPage: 1,
  		tasksPerPage: 10,
  		taskData: [],
  		displayTask: [],
  		searchString: '',
  		showUploadModal: false,
  		moreData: false,
  	}
  },

  compiled: function () {
  	loadTasks(this)
  },

  computed: {
  	displayTask: function() {
  		var searchstr = this.searchString
  		var filtereddata = this.taskData.filter(function(x){
  			return (x.name.indexOf(searchstr)!=-1) || (x.printer.indexOf(searchstr)!=-1)
  		})
  		return filtereddata
  	},
  },

  methods: {
    onUploadFile: function() {
      po.app.fileTaskParams = {
        mode: 'newfile',
        fileList: [],
        taskId: {},
      }
      po.app.showFileTaskModal = true
    },

    onEditTask: function($event,task) {
      po.app.showFileTaskModal = true
      po.app.fileTaskParams = {
        mode: 'edittask',
        fileList: [],
        taskId: task.id,
      }
      
    },
  	onLoadMore: function() {
  		this.displayedPage = this.displayedPage + 1
  		loadTasks(this)
  	},

  	onFileChange: function() {
  		this.fileData = []
  		this.displayedPage = 1
  		loadTasks(this)
  	}
  },

}

function loadTasks(vuemodel) {
  yy_request.rest_api({
    method: 'get',
    api: 'task/',
    data: {
      page:vuemodel.displayedPage,
    },
    opSuccess: function(info) {
      var taskdata = info

      if(taskdata.length==vuemodel.tasksPerPage) {
        vuemodel.moreData = true
      } else {
        vuemodel.moreData = false
      }
      vuemodel.taskData = vuemodel.taskData.concat(taskdata)
    },
  })
}
</script>