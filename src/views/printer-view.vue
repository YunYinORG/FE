<template>
  <div class="list-view col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8">
    <custom-select
      options="{{schoolList}}"
      value="{{@schoolId}}"
      desc="选择打印店所在的学校"
      on-select-change={{changeSchool}}>
    </custom-select>

    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-4" v-repeat="printer:printerList" track-by="id">
        <div class="pt-wrapper">
          <div class="pt-name">{{printer.name}}</div>
          <div class="pt-sch"><strong>{{printer.sch_name}}</strong></div>
          <div class="pt-add"><small>{{printer.address}}</small></div>          
        </div>
      </div>
    </div>

    <div class="row">
      <div class="text-center" v-show="moreData" v-on="click: loadMore" style="cursor:pointer">加载更多</div>
    </div>

  </div>
</template>
<script>
var yy_request = require('../js/yunyin_request')
var po = require('../js/public_object.js')

module.exports = {
  data: function() {
    return {
      schoolId: '-1',
      schoolList: [{value:"-1",text:"所有学校"}],
      printersPerPage: 10,
      printerList: [],
      displayedPage: 1,
      moreData: true,
    }
  },

  compiled: function() {
    var info = po.schoolsinfo
    var options = []
    for(var key in info) {
      options.push({
        value: info[key].id,
        text: info[key].name,
      })
    }
    this.schoolList = this.schoolList.concat(options)
    if(po.islogin) {
      this.schoolId = po.userinfo.sch_id
    }
    loadData(this)
  },

  methods: {
    changeSchool: function(e) {
      this.displayedPage = 1
      loadData(this)
    },

    loadMore: function(e) {
      this.displayedPage += 1
      loadData(this)
    }
  },

  components: {
    'custom-select': require('../controls/custom-select.vue'),
  },
}

function loadData(vuemodel) {
  var ajax_data = {
    page: vuemodel.displayedPage
  }

  if(vuemodel.schoolId!='-1') {
    ajax_data.sch_id = vuemodel.schoolId
  }

  yy_request.rest_api({
    method: 'get',
    api: 'printers/',
    data: ajax_data, 
    opSuccess: function(info) {
      var printerdata = info
      if(printerdata.length==vuemodel.printersPerPage) {
        vuemodel.moreData = true
      } else {
        vuemodel.moreData = false
      }
      for(var i in printerdata) {
        printerdata[i].sch_name = po.schoolsinfo[printerdata[i].sch_id].name
      }

      if(vuemodel.displayedPage==1) {
        vuemodel.printerList = printerdata
      } else {
        vuemodel.printerList = vuemodel.printerList.concat(printerdata)       
      }
    },
  })
}
</script>

<style>
.pt-wrapper {
  border: 1px solid #0BBD9E;
  border-radius: 3px;
  padding: 0px;
  margin-bottom: 15px;
  text-align: center;
}
.pt-wrapper .pt-name {
  display: block;
  padding: 10px 0;
  font-size: 26px;
  color: #eeeeee;
  background: #0BBD9E;
}
.pt-wrapper .pt-sch {
  margin-top: 10px;
} 
.pt-wrapper .pt-add {
  margin: 5px 10px;
  padding-top: 5px;
  border-top: 1px solid #aaaaaa;
}
</style>
