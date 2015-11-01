<template>
  <div class="filetable">
	<div class="row actions-wrapper">
    <div class="col-xs-12 col-sm-9">
      <button class="btn btn-embossed btn-primary" v-on="click: onUploadFile">
        <i class="glyphicon glyphicon-open"></i>
        <span class="hidden-xs">上传文件</span>
      </button>
      <button class="btn btn-embossed btn-primary" v-on="click: onPrint">
        <i class="glyphicon glyphicon-print"></i>
        <span class="hidden-xs">打印文件</span>
      </button>
      <button class="btn btn-embossed btn-primary" v-on="click: onShare">
        <i class="glyphicon glyphicon-share"></i>
        <span class="hidden-xs">分享文件</span>
      </button>
      <button class="btn btn-embossed btn-primary" v-on="click: onDelete">
        <i class="glyphicon glyphicon-trash"></i>
        <span class="hidden-xs">删除文件</span>
      </button>
    </div>
    <div class="hidden-xs col-sm-3">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="搜索您的文件" v-model="searchString">
        <span class="input-group-btn">
          <button class="btn"><i class="fui-search"></i></button>
        </span>
      </div>
    </div>
	</div>

  <div class="info-line" v-show="showActionInfo" v-transition="infoexpand">
    <small class="text-primary" v-text="actionInfoText"></small>
  </div>  
  <!-- <div class="table-responsive"> -->
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
            时间
          </th>       
          <th>
            操作
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>adf</td>
          <td>哈哈哈</td>
          <td>嘿嘿嘿</td>
          <td>yoyo</td>
        </tr>
        <tr>
          <td>adf</td>
          <td>哈哈哈</td>
          <td>hihihi</td>
          <td>yoyo</td>
        </tr>
        <!-- <template v-repeat="file:displayFile" track-by="id"> -->
          <!-- <div>{{file.name}}</div> -->
<!--           <tr>
            <td>
              <input type="checkbox" v-model="file.checked">
            </td>
            <td class="text-primary">
              {{file.name}}
            </td>
            <td>
              {{file.time.substr(5,11)}}
            </td>
            <td class='action-td'>
              <i class="glyphicon glyphicon-print" style="cursor:pointer"
                v-on="click: onPrint($event,file)"></i>
              <i class="glyphicon glyphicon-share" style="cursor:pointer"
                ></i>
              <i class="glyphicon glyphicon-trash" style="cursor:pointer"
                v-on="click: onDelete($event,file)"></i>
            </td>
          </tr> -->
        <!-- </template> -->
      </tbody>
    </table>
  <!-- </div> -->
	<div class="more" v-on="click: onLoadMore" v-if="moreData">加载更多</div>
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
  		fileData: [{checked:false,name:'test.test',time:'1@#!@#!2@@'},{checked:false,name:'test2.t',time:'1@#!@#!2@@'},],
  		// displayFile: [],
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
    po.vueFileList = this
  },

  computed: {
  	displayFile: function() {
  		var searchstr = this.searchString
  		var filtereddata = this.fileData.filter(function(x){
  			return x.name.indexOf(searchstr)!=-1
  		})
      alert(JSON.stringify(filtereddata))
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
  yy_request.rest_api({
    method: 'get',
    api: 'file/',
    data: {
      page: vuemodel.displayedPage,
    },  
    opSuccess: function(info) {
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
      alert('data load done')
    },
  })
}

function getCheckedList(vuemodel) {
	return vuemodel.displayFile.filter(function(x){
		return x.checked
	})
}

function deleteFile(vuemodel,file) {
  yy_request.rest_api({
    method: 'delete',
    api: 'file/'+file.id+'/',
    opSuccess: function(info) {
      vuemodel.fileData.$remove(file)
      vuemodel.actionFileDone += 1
    },
    opFail: function(info) {
      vuemodel.actionFileFail += 1
    },
  })	
}

</script>