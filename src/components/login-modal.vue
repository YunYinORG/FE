<template>
  <modal show="{{@show}}" width="{{modalWidth}}" default-title="{{title}}">
    <div class="modal-body">
      <div id="login-wrapper" v-if="showLogin">
        <form action="">
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
              <input type="text" class="form-control" id="username" placeholder="请输入您的学号"
                v-model="studentid"
                v-on="change: onNumberChange">
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
              <input type="password" class="form-control" id="pwd" placeholder="请输入您的密码"
                v-on="keyup: onSubmit | key 'enter'"
                v-model="password">
            </div>
          </div>
          <div>
            <input id="rmb" type="checkbox" v-model="remeber">
            <label for="rmb">自动登录</label>
            <small class="pull-right">忘记密码?</small>
          </div>

          <div v-show="showCode" class="form-group">
            <img id="code-img" src="../img/dummy-verifycode.png" alt="验证码" v-el="verifycode"
              v-on="click: changeCode">
            <input type="text" class="form-control pull-right" id="code-input"
              placeholder="请输入验证码"
              v-model="code">
          </div>

          <div class="form-group">
            <button type="button" id="submit" class="btn btn-embossed btn-primary btn-block"
              v-on="click: onSubmit">登录/注册</button>
          </div>
          <div>
            <small class="text-danger" v-text="errorinfo" v-show="erroinfo!=''"></small>
          </div>
        </form>
      </div> <!-- #login-wrapper -->
      <div id="reset-wrapper" v-if="showReset">
        <p class="text-center">
          <small>请为云印设置一个新的密码，以后您将使用这个密码登录云印服务</small>
        </p>
        <div class="form-group">
          <input type="text" class="form-control" id="nwpd-input"
            placeholder="新的密码"
            v-model="pwnew">
        </div>
        <div class="form-group">
          <button type="button" id="newpwd" class="btn btn-embossed btn-primary btn-block"
            v-on="click: newPassword">设置密码</button>
        </div>
      </div> <!-- #reset-wrapper -->
      <div id="done-wrapper" v-if="showDone">
        <small>欢迎您加入云印,即刻开始您的云打印之旅</small>
        <br>
        <br>
        <div class="form-group">
          <button type="button" id="newpwd" class="btn btn-embossed btn-primary btn-block"
            v-on="click: afterLogin">立即使用</button>
        </div>
      </div> <!-- #done-wrapper -->
    </div> <!-- .modal-body -->
    <div class="modal-footer">
      <small>首次注册请使用本校办公网系统账号及密码登录</small>
      <small><a>了解更多</a></small>
    </div>
  </modal>
</template>

<script>
var yy_request = require('../js/yunyin_request');
var po = require('../js/public_object.js')

module.exports = {
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true,
    }
  },

  data: function () {
    return {
      modalWidth: 400,
      title: "请先登录云印",
      showCode: false,
      code: '',
      codeSrc: '',
      studentid: '',
      password: '',
      schoolid: 0,
      usertype: '',
      remeber: false,
      errorinfo: '',
      pwnew: '',
      showLogin: true,
      showReset: false,
      showDone: false,
    }
  },

  computed: {
    title: function() {
      if(this.showLogin) {
        return "登陆云印，享受校园便捷打印"
      } else if(this.showReset) {
        return "设置您的云印密码"
      } else {
        return "注册完成"
      }
    }
  },

  methods: {
    onNumberChange: function(e) {
      var vuemodel = this
      var ajax_data = {
        number: vuemodel.studentid
      }
      yy_request.rest_api('post','school/number/',ajax_data,function(status,info) {
        var sch_value = []
        var sch_key = []
        if(status==1) {
          for(var key in info){
            sch_key.push(key)
            sch_value.push(info[key])
          }

          vuemodel.schoolid = sch_key[0]

          if(sch_value[0]==0) {
            vuemodel.usertype = 'old'
            vuemodel.errorinfo = ""
          } else {
            vuemodel.usertype = 'new'
            vuemodel.errorinfo = ""
            refreshCode(vuemodel)
          }
        } else {
          vuemodel.usertype = 'wrong'
          vuemodel.errorinfo = "学号格式有误"
        }
      })
    },

    onSubmit: function(e) {
      var vuemodel = this
      if(vuemodel.usertype=='old') {
        oldUserLogin(vuemodel)
      } else if(vuemodel.usertype=='new') {
        newUserVerify(vuemodel)
      }
    },

    newPassword: function(e) {
      var md5 = require("blueimp-md5")

      var vuemodel = this

      var ajax_data = {
        password: md5(vuemodel.pwnew)
      }

      yy_request.rest_api('post','user/',ajax_data,function(status,info){
        if(status==1) {
          vuemodel.showDone  = true
          vuemodel.showReset = false
        }
      })
    },

    changeCode: function(e) {
      refreshCode(this)
    },

    afterLogin: function(e) {
      loginSuccess(this)
    }

  },

  components: {
    'modal': require('./modal.vue'),
  }
}

function oldUserLogin(vuemodel) {
  var ajax_data = {
    number: vuemodel.studentid,
    password: vuemodel.password,
  }
  yy_request.rest_api('post','auth/',ajax_data,function(status,info){
    if(status==1) {
      loginSuccess(vuemodel)
      vuemodel.errorinfo = ""
    } else {
      vuemodel.errorinfo = "账号或密码错误，请重新尝试"
    }
  })
}

function refreshCode(vuemodel) {
  var refreshCodeAPI = 'school/' + vuemodel.schoolid + '/code/'
  yy_request.rest_api('get',refreshCodeAPI,null,function(status,info) {
    if(status==1) {
      vuemodel.$$.verifycode.src = info.img
      vuemodel.cookie=info.verify_cookie
      vuemodel.showCode = true
    } else {
      vuemodel.showCode = false
    }
  })
}

function newUserVerify(vuemodel) {
  var ajax_data = {
    number: vuemodel.studentid,
    password: vuemodel.password,
    sch_id: vuemodel.schoolid,
  }
  //显示验证码
  if(vuemodel.showCode)
  {
    ajax_data.code=vuemodel.code;
    ajax_data.verify_cookie=vuemodel.cookie;
  }

  yy_request.rest_api('post','auth/',ajax_data,function(status,info){
    if(status==-1) {
      vuemodel.errorinfo = "学校身份信息验证失败，请确认信息正确"
      if(vuemodel.showCode) {
        refreshCode(vuemodel)
      }
    } else {
      vuemodel.showReset = true
      vuemodel.showLogin = false
    }
  })
}

function loginSuccess(vuemodel) {
  yy_request.rest_api('get','user/',null,function(status,info){
    if(status==1) {
      po.app.username = info.name
    } else {
      po.app.username = '云印用户'
    }
  })

  vuemodel.show = false

  setTimeout(function(){
    vuemodel.showReset = false
    vuemodel.showLogin = true
    vuemodel.showDone = false
  },1000)

  if(po.app.view=='intro-view') {
    window.location.hash = '#/menu'
  }
}

</script>

<style>
#code-img {
  width: 40%;
}
#code-input {
  width: 40%;
}
</style>