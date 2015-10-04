<template>
  <modal show="{{@show}}" width="{{modalWidth}}" default-title="{{title}}">
    <div class="modal-body">
      <div class="pfiles-wrapper">
        <template v-repeat="pfile:pfiles" track-by="id">
          <div>{{pfile.name}}  <span v-on="click: onDelete">删除</span></div>
        </template>
      </div>
      <div class="psetting-wrapper">
        <select v-model="printerID" options="printerList" v-on="change: showPrinter"></select>
        <div class="info-wrapper">
          <p>{{printerInfo.name}}</p>  
          <p>{{printerInfo.address}}</p>  
          <p>{{printerInfo.phone}}</p>  
        </div>
        <div class="price-wrapper">
          <p>单面打印: {{printerInfo.price1}}</p>
          <p>双面打印: {{printerInfo.price2}}</p>
          <p>单面复印: {{printerInfo.price3}}</p>
          <p>双面复印: {{printerInfo.price4}}</p>
        </div>
        <div>
          <div>提前打印</div>
          <span>设置</span>
        </div>
        <div>
          <div v-text="isColor? '彩色打印':'黑白打印'"></div>
          <span v-on="click: isColor = !isColor">颜色</span>
        </div>
        <div>
          <input type="text" 
            v-model="copies" 
            style="ime-mode:disabled;" 
            onpaste="return false;"
            v-on="keypress: allowNumber">
          </input>
          <span>份</span>
        </div>
        <div>
          <div v-text="isDouble? '双面打印':'单面打印'"></div>
          <span v-on="click: isDouble = !isDouble">单双</span>
        </div>
        <div class="requirements">
          <label for="req">还有什么需求请写在这里告诉店家哦</label>
          <input id="req" type="textarea" v-model="requirements"></input>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <div v-if="mode=='add'">
        <input type="button" value="提交任务" v-on="click: onSubmitTask">
        <input type="button" value="取消" v-on="click: onCancel">
      </div>
      <div v-if="mode=='modifiy'">
        <input type="button" value="删除任务" v-on="click: onDeleteTask">
        <input type="button" value="取消修改" v-on="click: onCancel">
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
    mode: String,
    pfiles: Array,
    taskID: Number,
  },

  data: function () {
    return {
      modalWidth: 500,
      title: "请核对并提交您的打印任务",
      printerList: [],
      printerID: null,
      printerInfo: {},
      isColor: false,
      isDouble: false,
      copies: 1,
      requirements: '',
      stn: 0,
    }
  },

  compiled: function() {
    getPrinterList(this)
    if(this.mode=='modify') {
      getTaskInfo(this)
    }
  },

  methods: {
    showPrinter: function() {
      getPrinterDetail(this)
    },

    allowNumber: function(event) {
      var keyCode = event.keyCode;    
      if ((keyCode >= 48 && keyCode <= 57)) {    
        event.returnValue = true;    
      } else {
        event.returnValue = false;    
      }    
    },

    onSubmitTask: function() {
      addTask(this)
    },

    onDeleteTask: function() {
      delTask(this)
    },

    onCancel: function() {
      this.show = false
    },

  },

  computed: {
    submittedTaskNumber: {
      get: function() {
        return this.stn
      },
      set: function(newValue) {
        this.stn = newValue
        console.log(newValue)
        if(newValue==this.pfiles.length) {
          alert('所有任务上传成功')
          this.stn = 0
        }
      },
    }
  },

  components: {
    'modal': require('./modal.vue'),
  }
}

function getPrinterList(vuemodel) {
  yy_request.rest_api('get','printers/',null,function(status,info){
    if(status==1) { 
      for(var i in info) {
        vuemodel.printerList.push({
          text: info[i].name+' ['+info[i].address+']',
          value: info[i].id,
        })
      }
      vuemodel.printerID = info[0].id      
      getPrinterDetail(vuemodel)
    }
  })
}

function getPrinterDetail(vuemodel) {
  yy_request.rest_api('get','printers/'+vuemodel.printerID,null,function(status,info){
    if(status==1) {
      vuemodel.printerInfo = {
        name: info.name,
        address: info.address,
        phone: info.phone,
        price1: info.price.split(',')[0],
        price2: info.price.split(',')[1],
        price3: info.price.split(',')[2],
        price4: info.price.split(',')[3],
      }
    }
  })
}

function getTaskInfo(vuemodel) {
  yy_request.rest_api('get','task/'+vuemodel.taskID,null,function(status,info) {
    if(status==1) {
      vuemodel.printerID = info.pri_id
      vuemodel.copies = parseInt(info.copies)
      vuemodel.isColor = info.color==null? false:true
      vuemodel.isDouble = info.isdouble==null? false:true
      vuemodel.requirements = info.requirements
      vuemodel.pfiles = [{name: info.filename}]
    }
  })
}

function addTask(vuemodel) {
  for(var i in vuemodel.pfiles) {
    var pf = vuemodel.pfiles[i]
    var ajax_data = {
      fid: pf.id,
      pid: vuemodel.printerID,
      copies: parseInt(vuemodel.copies),
      color: vuemodel.isColor,
      isdouble: vuemodel.isDouble,
      // ppt: vuemodel.ppt,
      requirements: vuemodel.requirements
    }
    yy_request.rest_api('post','task/',ajax_data,function(status,info){
      if(status==1) {
        vuemodel.submittedTaskNumber = vuemodel.submittedTaskNumber + 1
      }
    })
  }
}

function modifyTask(vuemodel) {
  var ajax_data = {
    pid: vuemodel.printerID,
    copies: parseInt(vuemodel.copies),
    color: vuemodel.isColor,
    isdouble: vuemodel.isDouble,
    // ppt: vuemodel.ppt,
    requirements: vuemodel.requirements
  }
  yy_request.rest_api('post','task/'+vuemodel.taskID,ajax_data,function(status,info){
    if(status==1) {
      vuemodel.submittedTaskNumber = vuemodel.submittedTaskNumber + 1
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