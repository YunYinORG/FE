<template>
	<div class="actions-wrapper">
		<div id="upload-btn" v-on="click: onUpload">上传文件</div>
		<div id="print-btn" v-on="click: onPrint">打印文件</div>
		<div id="share-btn" v-on="click: onShare">分享文件</div>
		<div id="delete-btn" v-on="click: onDelete">删除文件</div>
		<form id="search">
			搜索文件
			<input type="text" v-model="searchString">
		</form>		
	</div>
	<table>
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
					<td>
						<span>打印</span>
						<span>分享</span>
						<span v-on="click: onDelete($event,file)">删除</span>
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
  		filesPerPage: 10,
  		fileData: [],
  		displayFile: [],
  		checkedAll: false,
  		searchString: '',
  		showUploadModal: false,
  		moreData: false,
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
	console.log(vuemodel)
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
	
</style>