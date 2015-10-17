<template>
  <div class="filetable">
	<div class="row actions-wrapper">
    <div class="col-xs-8">
      <button class="btn btn-embossed btn-primary" v-on="click: onUploadFile">
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
      <div class="input-group">
        <input type="text" class="form-control" placeholder="搜索您的文件" v-model="searchString">
        <span class="input-group-btn">
          <button class="btn"><span class="fui-search"></span></button>
        </span>
      </div>
    </div>
	</div>

  <div class="action-info" v-show="showActionInfo" v-transition="infoexpand">
    <small class="text-primary" v-text="actionInfoText"></small>
  </div>  
  <div class="table-responsive">
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
  </div>
	<div class="more-file" v-on="click: onLoadMore" v-if="moreData">加载更多</div><!--没有更多时应为灰色-->
  </div>
</template>

<script>
var yy_request = require('../js/yunyin_request')
var po = require('../js/public_object.js')

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
      taskMode: 'add',
      showActionInfo: false,
      actionName: '',
      actionFileDone: 0,
      actionFileFail: 0,
      actionFileTotal: 0,
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

    actionInfoText: function() {
      var vuemodel = this
      if(this.actionName=='delete') {
        this.showActionInfo = true
        
        if(this.actionFileDone+this.actionFileFail==this.actionFileTotal && this.actionFileTotal!=0) {
          setTimeout(function(){
            vuemodel.actionName = ''
          },1000)
        }
        return  "正在删除文件中... 成功："+this.actionFileDone  +"，失败："+ this.actionFileFail
      } else {
        this.showActionInfo = false
        return ''
      }
    }

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

  	onPrint: function($event,op_file) {
  		if(op_file!=undefined) {
  			var checkedfile = [op_file]
  		} else {
  			var checkedfile = getCheckedList(this) 			
  		}
      po.app.fileTaskParams.mode = "newtask"
      po.app.fileTaskParams.fileList = checkedfile
      po.app.fileTaskParams.taskId = null     
  		po.app.showFileTaskModal = true
  	},

  	onShare: function(op_file) {

  	},

  	onDelete: function($event,op_file) {
      if(this.actionName=='') {
        this.actionName = 'delete'

        if(op_file!=undefined) {
          var checkedfile = [op_file]
        } else {
          var checkedfile = getCheckedList(this)      
        }

        this.actionFileTotal = checkedfile.length
        this.actionFileDone = 0
        this.actionFileFail = 0

        for(var i in checkedfile) {
          deleteFile(this,checkedfile[i])
        }

      } else {
        alert('请等待之前的操作完成，谢谢！')
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
      vuemodel.actionFileDone += 1
  	} else {
    	vuemodel.actionFileFail += 1
  	}
	})	
}





</script>

<style>
.actions-wrapper {
  margin-bottom: 15px;
}

.more-file {
  text-align: center;
  width: 100%;
  margin-top: -10px;
  cursor: pointer;
}

.action-line {
  width: 120px;
}
.action-line span {
  margin-left: 8%;
}

.action-info {
  padding-left: 10px;
  height: 30px;
  overflow: hidden;
  -webkit-transition: all .3s ease;
  -o-transition: all .3s ease;
  transition: all .3s ease;
}

.infoexpand-enter, 
.infoexpand-leave {
  height: 0px;
  -webkit-transition: all .3s ease;
  -o-transition: all .3s ease;
  transition: all .3s ease;
}

/*.filetable {
  max-height:10px;
}*/
</style>