<template>
  <div class="taskinfo-wrapper">
    <form>
      <div class="form-group">
        <select class="form-control select select-primary mbl"
          v-model="printerID"
          options="printerList" 
          v-on="change: showPrinterInfo">
          <option value="">选择您想去的打印店</option>
        </select>
      </div>
      <div class="panel panel-success text-center">
        <div class="panel-heading">
          <p style="font-size: 22px; margin-bottom:0">{{printerInfo.name}}</p>
          <p style="font-size: 22px; margin-bottom:0">{{printerInfo.address}}</p>
          <p style="font-size: 22px; margin-bottom:0">{{printerInfo.phone}}</p>
        </div>
        <div class="panel-body">
          <p>黑白单面：{{printerInfo.price1}}</p>
          <p>黑白双面：{{printerInfo.price2}}</p>
          <p>彩印单面：{{printerInfo.price3}}</p>
          <p style="margin-bottom: 0">彩印双面：{{printerInfo.price4}}</p>
        </div>
      </div>
      <div class="form-group">
        <div class="row">
          <div class="col-xs-2">
            <div class="bootstrap-switch-square">
              <input v-model="isInStore" type="checkbox" data-on-text="到店" data-off-text="提前" id="is-pre-print" checked/>
            </div>
          </div>
          <div class="col-xs-offset-2 col-xs-2">
            <div class="bootstrap-switch-square more-setting">
              <input v-model="isBlackWhite" type="checkbox" data-on-text="黑白" data-off-text="彩印" id="print-color" checked/>
            </div>
          </div>
          <div class="col-xs-offset-2 col-xs-1">
            <div class="bootstrap-switch-square more-setting">
              <input v-model="isSingleSide" type="checkbox" data-on-text="单面" data-off-text="双面" id="is-double-print" checked/>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group more-setting">
        <div class="input-group">
          <span class="input-group-addon">打印份数</span>
          <input v-model="copies" type="number" placeholder="份数" class="form-control" id="print-copies" min="1" value="1"/>
        </div>
        <div class="clear"></div>
      </div>
    </form>

 <!--    <select v-model="printerID" options="printerList" v-on="change: showPrinter"></select>
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
    </div> -->
  </div>  
</template>

<script>
  
var yy_request = require('../js/yunyin_request')

module.exports = {
  props: {
    taskSetting: Object,
  },

  data: function () {
    return {
      printerId: null,
      printerList: [],
      printerInfo: {},
      isInStore: true,
      isColor: false,
      isDouble: false,
      copies: 1,
      requirements: '',

      // isColor: false,
      // isDouble: false,
      // copies: 1,
      // requirements: '',
      // stn: 0,
    }
  },

  compiled: function() {
    getPrinterList(this)
    if(this.taskSetting.isColor!=null) {
      this.isInStore = false
    }
  },

  methods: {
    showPrinterInfo: function() {
      getPrinterDetail(this)
    },
  },

  computed: {
    taskSetting: function() {
      tasksetting = {
        pid: this.printerId,
      }
      if(this.isInStore) {
        tasksetting.copies = ''
        tasksetting.color = ''
        tasksetting.isdouble = ''
        tasksetting.requirements = ''
      } else {
        tasksetting.copies = this.copies
        tasksetting.color = this.isColor
        tasksetting.isdouble = this.isDouble
        tasksetting.requirements = this.requirements
      }

      return tasksetting
    },
  },
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

</script>
<style>
  
</style>
