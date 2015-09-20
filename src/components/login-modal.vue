<template>
  <modal show="{{@show}}" width="{{modalWidth}}" default-title="{{title}}">
    <div class="modal-body">
      <div id="login-wrapper" v-if="showLogin">
        <form action="">
          <div>
            学号
            <input type="text" v-model="studentid">
          </div>
          <div>
            密码
            <input type="password" v-on="keyup: onSubmit | key 'enter'" v-model="password">
          </div>
          <div>
            <input id="rmb" type="checkbox" v-model="remeber">
            <label for="rmb">自动登录</label>
            <a href="">忘记密码?</a>
          </div>
          <div v-show="showCode">
            <p>请输入验证码</p>
            <input id="cd" type="text" v-model="code">
            <img src="../img/dummy-verifycode.png" alt="验证码" v-el="verifycode" v-on="click: refreshCode">
          </div>  
          <div>
            <input type="button" v-on="click: onSubmit" value="登陆">
          </div>
          <div>
            <p v-text="errorinfo"></p>
          </div>
        </form>
      </div> <!-- #login-wrapper -->
      <div id="reset-wrapper" v-if="showReset">
        <p> 请为云印设置一个新的密码 </p>
        <div>
          <input type="password" v-model="pwnew">
        </div> 
        <input type="button" v-on="click: newPassword" value="确定">
      </div> <!-- #reset-wrapper -->
      <div id="done-wrapper" v-if="showDone">
        <h3>欢迎加入云印</h3>
        <input type="button" v-on="click: afterLogin" value="立即使用">
      </div> <!-- #done-wrapper -->
    </div> <!-- .modal-body -->
    <div class="modal-footer">
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
    po.app.view = 'home-view'
  } 
}

</script>

<style>
.wrapper {

}
</style>