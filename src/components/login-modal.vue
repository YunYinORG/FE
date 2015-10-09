<template>
  <modal show="{{@show}}" width="{{modalWidth}}" default-title="{{title}}">
    <div class="modal-body">
      <div id="login-wrapper" v-if="showLogin">
        <form action="">
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
              <input type="text" class="form-control" id="username" placeholder="请输入您的学号"
                v-model="studentid">
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
              v-on="click: refreshCode">
            <input type="text" class="form-control pull-right" id="code-input" 
              placeholder="请输入验证码"
              v-model="code">
          </div>

          <div class="form-group">
            <button type="button" id="submit" class="btn btn-embossed btn-primary btn-block"
              v-on="click: onSubmit">登录/注册</button>
          </div>
          <div>
            <p class="help-block" v-text="errorinfo" v-show="erroinfo!=''"></p>
          </div>
        </form>
      </div> <!-- #login-wrapper -->
      <div id="reset-wrapper" v-if="showReset">
        <small> 请为云印设置一个新的密码，以后您将使用这个密码登录云印服务 </small>
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

var newuser_id = []

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
    onSubmit: function(e) {
      // student id format check
      var reg = /^\d{7}|\d{10}$/

      var vuemodel = this

      if(!reg.test(vuemodel.studentid)) {
        alert('请输入格式正确的学号')
      } else {
        if(newuser_id.indexOf(vuemodel.studentid)!=-1) {
          newUserVerify(vuemodel)
        } else {
          var ajax_data = {
            number: vuemodel.studentid
          }
          yy_request.rest_api('post','school/number/',ajax_data,function(status,info) {
            var sch_value = []
            if(status==1) {
              for(var key in info){
                sch_value.push(info[key])
              }
              if(sch_value[0]==0) {
                oldUserLogin(vuemodel)
              } else {
                var si = require('../js/school_identify.js')
                si.get_school_id(function(id,name){
                  vuemodel.schoolid = id
                  newuser_id.push(vuemodel.studentid)
                  testCode(vuemodel)
                })              
              }
            }
          })
        
        }

      }  
    },

    newPassword: function(e) {
      var md5 = require("blueimp-md5")

      var vuemodel = this

      var ajax_data = {
        password: md5(vuemodel.pwnew)    
      }

      yy_request.rest_api('post','auth/register/',ajax_data,function(status,info){
        if(status==1) {
          vuemodel.showDone  = true
          vuemodel.showReset = false
        }
      })
    },

    refreshCode: function(e) {
      testCode(this)
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
    } else {
      vuemodel.errorinfo = "密码错误，请重新尝试"
    }
  })
}

function testCode(vuemodel) {
  var testCodeAPI = 'school/' + vuemodel.schoolid + '/code/'
  yy_request.rest_api('get',testCodeAPI,null,function(status,info) {
    if(status==0) {
      newUserVerify(vuemodel)
    } else {
      vuemodel.$$.verifycode.src = info
      vuemodel.showCode = true
    }

  })
}

function newUserVerify(vuemodel) {
  var ajax_data = {
    number: vuemodel.studentid,
    password: vuemodel.password,
    sch_id: vuemodel.schoolid,
    code: vuemodel.code,
  }

  yy_request.rest_api('post','auth/',ajax_data,function(status,info){
    if(status==-1) {
      vuemodel.errorinfo = "验证失败，请重新验证"
      testCode(vuemodel)
    } else {
      vuemodel.showReset = true
      vuemodel.showLogin = false    
    }
  })
}

function loginSuccess(vuemodel) {
  vuemodel.show = false
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