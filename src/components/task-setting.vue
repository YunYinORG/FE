<template>
  <div class="taskinfo-wrapper">
    <my-select
      options="{{printerList}}"
      value="{{@taskSetting.printerId}}"
      desc="选择想去的打印店"
      on-select-change={{showPrinterInfo}}>
    </my-select>

    <div class="panel panel-success text-center">
      <div class="panel-heading">
        <p style="font-size: 22px; margin-bottom:0">{{printerInfo.name}}</p>
        <p style="font-size: 22px; margin-bottom:0">{{printerInfo.address}}</p>
        <p style="font-size: 22px; margin-bottom:0">{{printerInfo.phone}}</p>
      </div>
      <div class="panel-body">
        <p>黑白单面（A4）：¥{{printerInfo.price1}}/页</p>
        <p>黑白双面（A4）：¥{{printerInfo.price2}}/页</p>
        <p>彩印单面（A4）：¥{{printerInfo.price3}}/页</p>
        <p style="margin-bottom: 0">彩印双面（A4）：¥{{printerInfo.price4}}/页</p>
      </div>
    </div>
    
    <div class="row">
      <div class="col-sm-3 cl">
        <my-switch
          true-text="到店"
          false-text="提前"
          value="{{@taskSetting.isInStore}}">
        </my-switch>
      </div>
      <div class="col-sm-3 cl">
        <my-switch
          v-if="!taskSetting.isInStore"
          v-transition="expand"
          true-text="双面"
          false-text="单面"
          value="{{@taskSetting.isDoubleSide}}">
        </my-switch>
      </div>
      <div class="col-sm-3 cl">
        <my-switch
          v-if="!taskSetting.isInStore"
          v-transition="expand"
          true-text="彩印"
          false-text="黑白"
          value="{{@taskSetting.isColor}}">
        </my-switch>
      </div>
      <div class="col-sm-3">
        <div class="input-group copies-wrapper" v-if="!taskSetting.isInStore" v-transition="expand">
          <input v-model="taskSetting.copies" type="number" placeholder="份数" class="form-control input-sm" id="print-copies" min="1" value="1"/>
          <span class="input-group-addon input-sm">份</span>
        </div>
      </div>
    </div>

    <div class="requirement" v-if="!taskSetting.isInStore" v-transition="expand">
      <textarea v-model="taskSetting.requirements" type="text" placeholder="还有什么需要告诉店家的请写在这里" class="form-control" ></textarea>
    </div>

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
      printerList: [],
      printerInfo: {},
    }
  },

  compiled: function() {
    getPrinterList(this)
  },

  methods: {
    showPrinterInfo: function() {
      getPrinterDetail(this)
    },
  },

  components: {
    'my-select': require('../controls/my-select.vue'),
    'my-switch': require('../controls/my-switch.vue'),
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
    }
  })
}

function getPrinterDetail(vuemodel) {
  yy_request.rest_api('get','printers/'+vuemodel.taskSetting.printerId,null,function(status,info){
    if(status==1) {
      vuemodel.printerInfo = {
        name: info.name,
        address: info.address,
        phone: info.phone,
        price1: info.price.c_s,
        price2: info.price.c_d,
        price3: info.price.s,
        price4: info.price.d,
      }
    }
  })
}

</script>
<style>
.panel-success > .panel-heading{
    color: white;
    background-color: #1abc9c;
    border-color: #d6e9c6;
}

.panel-body > p{
    font-size: 20px;
    margin: 5px;
}
label[for='print-copies']{
    font-size: 25px;
    margin-top: -8px;
    margin-left: 10px;
}
.cl {
  margin-top: 2px;
}

.requirement {
  margin-top: 15px;
}

.expand-enter,
.expand-leave {
  max-height: 0;
  -webkit-transition: max-height 0.3s ease;
  -o-transition: max-height 0.3s ease;
  transition: max-height 0.3s ease;
}

</style>
