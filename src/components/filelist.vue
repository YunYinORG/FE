<template>
  <div class="filetable">
	<div class="row actions-wrapper">
    <div class="col-xs-8">
      <button class="btn btn-embossed btn-primary" v-on="click: onUpload">
        <span class="glyphicon glyphicon-open"></span>
        上传文件
      </button>
      <button class="btn btn-embossed btn-primary" v-on="click: onPrint">
        <span class="glyphicon glyphicon-print"></span>
        打印文件
      </button>
      <button class="btn btn-embossed btn-primary" v-on="click: onShare">
        <span class="glyphicon glyphicon-share"></span>
        分享文件
      </button>
      <button class="btn btn-embossed btn-primary" v-on="click: onDelete">
        <span class="glyphicon glyphicon-trash"></span>
        删除文件
      </button>
    </div>
    <div class="col-xs-3 col-xs-offset-1">
      <input class="search-input form-control" type="text" v-model="searchString" placeholder="搜索您的文件">    
    </div>
	</div>

	<table class="table table-hover">
		<thead>
			<tr>
				<th>
					<input type="checkbox" v-model="checkedAll">
				</th>
				<th>
					文件名
				</th>
				<th>
					上传日期
				</th>				
				<th>
					操作
				</th>
			</tr>
		</thead>
		<tbody>
			<template v-repeat="file:displayFile" track-by="id">
				<tr>
					<td>
						<input type="checkbox" v-model="file.checked">
					</td>
					<td>
						{{file.name}}
					</td>
					<td>
						{{file.time}}
					</td>
					<td class='action-line'>
						<span class="glyphicon glyphicon-print"></span>
						<span class="glyphicon glyphicon-share"></span>
            <span class="glyphicon glyphicon-trash"
              v-on="click: onDelete($event,file)"></span>
					</td>
				</tr>
 			</template>
		</tbody>
	</table>
	<div class="more" v-on="click: onLoadMore" v-if="moreData">加载更多</div><!--没有更多时应为灰色-->
  </div>
	<upload-modal show="{{@showUploadModal}}" on-file-change="{{onFileChange}}"></upload-modal>
	<newtask-modal show="{{@showNewTaskModal}}" pfiles="{{pfiles}}" mode="{{taskMode}}"></newtask-modal>
</template>

<script>
var yy_request = require('../js/yunyin_request')

module.exports = {

  data: function() {
  	return {
  		displayedPage: 1,
  		filesPerPage: 10,
  		fileData: [],
  		displayFile: [],
  		checkedAll: false,
  		searchString: '',
  		showUploadModal: false,
  		moreData: false,
  		pfiles:[],
  		showNewTaskModal: false,
      taskMode: 'add'
  	}
  },

  compiled: function () {
  	loadData(this)
  },

  computed: {
  	displayFile: function() {
  		var searchstr = this.searchString
  		var filtereddata = this.fileData.filter(function(x){
  			return x.name.indexOf(searchstr)!=-1
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
  	onPrint: function($event,op_file) {
  		if(op_file!=undefined) {
  			var checkedfile = [op_file]
  		} else {
  			var checkedfile = getCheckedList(this) 			
  		}
  		this.pfiles = checkedfile
  		this.showNewTaskModal = true
  	},
  	onShare: function(op_file) {

  	},

  	onDelete: function($event,op_file) {
  		if(op_file!=undefined) {
  			var checkedfile = [op_file]
  		} else {
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
    'newtask-modal': require('../components/newtask-modal.vue'),
  }

}


function loadData(vuemodel) {
  yy_request.rest_api('get','file/',{page:vuemodel.displayedPage},function(status,info){
    if(status==1) {
      var filedata = info
      for(var i in filedata) {
        filedata[i].checked = false
      }
      if(filedata.length==vuemodel.filesPerPage) {
      	vuemodel.moreData = true
      } else {
      	vuemodel.moreData = false
      }
      vuemodel.fileData = vuemodel.fileData.concat(filedata)
      }
  })
}

function getCheckedList(vuemodel) {
	return vuemodel.displayFile.filter(function(x){
		return x.checked
	})
}

function deleteFile(vuemodel,file) {
  yy_request.rest_api('delete','file/'+file.id+'/',null,function(status,info){
  	if(status==1){
    	vuemodel.fileData.$remove(file)
  	} else {
    	alert("OOps,删除失败啦")
  	}
	})	
}





</script>

<style>
.actions-wrapper {
  margin-bottom: 20px;
}

.more {
  text-align: center;
  width: 100%
}

.action-line {
  width: 120px;
}
.action-line span {
  margin-left: 8%;
}

/*.filetable {
  max-height:10px;
}*/
</style>