<template>
  <modal show="{{@show}}" width="{{modalWidth}}" default-title="{{modalTitle}}">
    <div class="modal-body">
      <div v-show="stage=='code'">
        <p class="text-center text-primary">{{codeInfo}}</p>
        <div class="form-group">
          <input type="text" class="form-control" id="nwpd-input"
            placeholder="请输入验证码"
            v-model="code">
        </div>
      </div>
      <div v-show="stage=='reset'">
        <p class="text-center text-primary">验证成功，请在下面重新设置您的密码</p>
        <div class="form-group">
          <input type="text" class="form-control" id="nwpd-input"
            placeholder="请输入新的密码"
            v-model="password">
        </div>        
      </div>
      <div v-show="stage=='finish'">
        <p class="text-center text-primary">{{finishInfo}}</p>     
      </div> 
      <p class="text-center text-danger" v-text="errorInfo" v-show="errorInfo!=''"></p>    
    </div>   
    <div class="modal-footer">
      <button class="btn btn-primary btn-wide" v-on="click: show = false">取消</button>
      <button class="btn btn-primary btn-wide" v-on="click: onConfirm">确定</button>
    </div>    
  </modal>
</template>

<script>
var yy_request = require('../js/yunyin_request')
var po = require('../js/public_object.js')

module.exports = {
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true,
    },
    stage: String,
    verifyWay: String,
    verifyType: String,
    verifyInfo: String,
  },

  data: function () {
    return {
      modalWidth: 600,
      code: "",
      password: "",
      errorInfo: "",
    }
  },

  computed: {
    modalTitle: function() {
      if(this.stage=='code') {
        return "输入验证码"
      } else if(this.stage=='reset') {
        return '重置密码'
      } else if(this.stage=='finish') {
        return '操作成功'
      }
    },

    codeInfo: function() {
      if(this.verifyWay=='phone') {
        return "验证码已经发送到: "+ this.verifyInfo + "，请输入验证码完成操作"
      } else if(this.verifyWay=="email") {
        return "验证码已经发送到: "+ this.verifyInfo + "，请输入验证码或点击邮件中的验证链接完成操作"
      }
    },

    finishInfo: function() {
      if(this.verifyType=='bind') {
        return "信息绑定成功！"
      } else if(this.verifyType=='reset') {
        return "密码重置成功！请牢记您的新密码"
      }
    },
  },

  methods: {
    onConfirm: function() {
      var vuemodel = this
      if(this.stage=="code") {
        if(this.verifyType=='bind') {
          bindUserInfo(this)
        } else if(this.verifyType=='reset') {
          verifyResetCode(this)
        }
      } else if(this.stage=='reset') {
        resetPassword(this)
      } else if(this.stage=='finish') {
        this.show = false
        vuemodel.errorInfo = ""
        window.location.reload()
      }
    },
  },

  components: {
    'modal': require('./modal.vue'),
  }
}

function bindUserInfo(vuemodel) {
  yy_request.rest_api({
    method: 'put',
    api: 'user/' + po.userinfo.id +'/' + vuemodel.verifyWay,
    data: {
      code: vuemodel.code,
    },
    opSuccess: function(info) {
      vuemodel.stage = 'finish'
      vuemodel.errorInfo = ""
    },
    opFail: function(info) {
      vuemodel.errorInfo = info
    },
  })
}

function verifyResetCode(vuemodel) {
  var api_url = 'password/code'
  var ajax_data = {
    code: vuemodel.code,
  }

  yy_request.rest_api({
    method: 'post',
    api: 'password/code',
    data: {
      code: vuemodel.code,
    },
    opSuccess: function(info) {
      vuemodel.stage = 'reset'
      vuemodel.errorInfo = ""
    },
    opFail: function(info) {
      vuemodel.errorInfo = info
    },
  })
}

function resetPassword(vuemodel) {
  var md5 = require("blueimp-md5")
  yy_request.rest_api({
    method: 'post',
    api: 'password/',
    data: {
      password: md5(vuemodel.password)
    },
    opSuccess: function(info) {
      vuemodel.stage = 'finish'
      vuemodel.errorInfo = ""
    },
    opFail: function(info) {
      vuemodel.errorInfo = info
    },
  })
}

</script>

<style>
</style>