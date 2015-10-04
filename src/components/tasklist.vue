<template>
	<div class="actions-wrapper">
		<div id="upload-btn" v-on="click: onUpload">添加新的打印任务</div>
		<form id="search">
			搜索任务
			<input type="text" v-model="searchTask">
		</form>		
	</div>
	<table>
		<thead>
			<tr>
				<th>文件状态</th>
				<th>文件名</th>
				<th>上传时间</th>				
        <th>打印店</th>
        <th>份数</th>
        <th>单双</th>
        <th>彩印</th>
        <th>格式</th>
				<th>操作</th>
			</tr>
		</thead>
		<tbody>
			<template v-repeat="task:displayTask" track-by="id">
				<tr>
          <td>{{task.status}}</td>
          <td>{{task.fname}}</td>
          <td>{{task.time}}</td>
          <td>{{task.printer}}</td>
          <td>{{task.copies}}</td>
          <td>{{task.double}}</td>
          <td>{{task.color}}</td>
          <td>{{task.ppt}}</td>
					<td>
            <span>修改任务</span>
					</td>
				</tr>
 			</template>
		</tbody>
	</table>
	<div v-on="click: onLoadMore" v-if="moreData">加载更多</div><!--没有更多时应为灰色-->
	<upload-modal show="{{@showUploadModal}}" on-file-change="{{onFileChange}}"></upload-modal>
</template>

<script>
var yy_request = require('../js/yunyin_request')

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
  	displayFile: function() {
  		var searchstr = this.searchString
  		var filtereddata = this.TaskData.filter(function(x){
  			return (x.filename.indexOf(searchstr)!=-1) || (x.printername.indexOf(serachString)!=-1)
  		})
  		return filtereddata
  	},

  	checkedAll: {
  		set: function(value) {
  			for(var i in this.displayFile) {
  				this.displayFile[i].checked = value
  			}
  		}
  	},
  },

  methods: {
  	onUpload: function(op_file) {
  		this.showUploadModal = true
  	},
  	onPrint: function(op_file) {

  	},
  	onShare: function(op_file) {

  	},

  	onDelete: function($event,op_file) {
  		console.log(op_file)
  		if(op_file!=undefined) {
  			var checkedfile = [op_file]
  		} else {
  			console.log('haha')
  			var checkedfile = getCheckedList(this) 			
  		}
  		for(var i in checkedfile) {
  			deleteFile(this,checkedfile[i])
  		}
  	},

  	onLoadMore: function() {
  		this.displayedPage = this.displayedPage + 1
  		loadData(this)
  	},
  	onFileChange: function() {
  		this.fileData = []
  		this.displayedPage = 1
  		loadData(this)
  	}
  },

  components: {
  	'upload-modal': require('../components/upload-modal.vue'),
  }

}

function loadTasks(vuemodel) {
  yy_request.rest_api('get','task/',{page:vuemodel.displayedPage},function(status,info){
    if(status==1) {
      var taskdata = info

      if(tasklist.length==vuemodel.tasksPerPage) {
      	vuemodel.moreData = true
      } else {
      	vuemodel.moreData = false
      }
      vuemodel.taskData = vuemodel.taskData.concat(taskdata)
    }
  })
}

function deleteTask(vuemodel,task) {
  yy_request.rest_api('delete','task/'+task.id+'/',null,function(status,info){
  	if(status==1){
    	vuemodel.taskData.$remove(task)
  	} else {
    	alert("OOps,删除失败啦")
  	}
	})	
}





</script>

<style>
	
</style>