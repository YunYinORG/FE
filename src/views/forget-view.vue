<template>
	<div class="forget-view">
		<div class="text-center">
			<h3>云印密码找回</h3>
		</div>
		<div class="well">
			<p class="well text-center">为了防止你的账号信息滥用，你可以通过手机验证、邮箱验证、或校园账号验证（南开URP或者天大办公网），找回你的密码。 
			<br>如果账号不在系统中，请前往云印南天首页直接登录。
			</p>
			<div class="btn-group btn-group-justified">
				<a class="btn btn-primary" v-on="click: findWay='phone'" v-class="active : findWay=='phone'">绑定手机找回</a>
				<a class="btn btn-primary" v-on="click: findWay='email'" v-class="active : findWay=='email'">绑定邮箱找回</a>
				<a class="btn btn-primary" v-on="click: findWay='school'" v-class="active : findWay=='school'">校园账号找回</a>
			</div>
			<h5 class="text-center find-title" v-text="findTitle"></h5>
			<div class="row">
				<div class="form-group col-sm-12 col-md-6 col-md-offset-3" style="margin-bottom: 0">
					<div v-show="findWay=='school'">
				    <my-select
				      options="{{schoolList}}"
				      value="{{@schoolId}}"
				      desc="请选择您的学校"
				      on-select-change={{onSchoolChange}}>
			    	</my-select>
			    	<p class="text-center" v-if="verifyInfo!=''">{{verifyInfo}}</p>					
					</div>
					<div class="input-group">
						<span class="input-group-addon">学号</span>
						<input type="text" class="form-control" placeholder="请输入您的学号" v-model="findId">
					</div>
					<div class="input-group">
						<span class="input-group-addon">{{findHint}}</span>
						<input type="{{findType}}" class="form-control" placeholder="{{findPlaceholder}}" v-model="findInfo">
					</div>
	        <p>
            <small class="text-danger" v-text="errorinfo" v-show="erroinfo!=''"></small>
        	</p>
				</div>
        <div v-show="showCode && findWay=='school'" class="form-group col-sm-12 col-md-6 col-md-offset-3">
          <img id="code-img" src="../img/dummy-verifycode.png" alt="验证码" v-el="verifycode" style="width:auto;height:45px"
            v-on="click: changeCode">
          <input type="text" class="form-control pull-right" id="code-input" 
            placeholder="请输入验证码"
            v-model="code">
        </div>
				<div class="submit-wrapper col-sm-12 col-md-6 col-md-offset-3">
					<button class="btn btn-embossed btn-primary btn-block"
						v-on="click: onSubmit">提交</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
var yy_request = require('../js/yunyin_request')
var po = require('../js/public_object.js')
var md5 = require("blueimp-md5")

module.exports = {
	data: function() {
		return {
			findWay: 'phone',
			findId: '',
			findInfo: '',
			showCode: false,
			code:'',
			schoolList: [],
			schoolId: null,
			verifyInfo: '',
			errorinfo: '',
			usertype: '',
		}
	},

	computed: {
		findTitle: function() {
			if(this.findWay=="phone") {
				return "通过已验证的手机接收验证码，并重设密码"
			} else if(this.findWay=="email") {
				return "通过已验证的邮箱接收验证码，并重设密码"
			} else if(this.findWay=="school"){
				return "重新验证校园账号，并重设密码"
			}
		},
		findHint: function() {
			if(this.findWay=="phone") {
				return "手机"
			} else if(this.findWay=="email") {
				return "邮箱"
			} else if(this.findWay=="school"){
				return "密码"
			}
		},
		findPlaceholder: function() {
			if(this.findWay=="phone") {
				return "请输入您绑定的手机号"
			} else if(this.findWay=="email") {
				return "请输入您绑定的邮箱"
			} else if(this.findWay=="school"){
				return "请输入南开URP或天大办公网密码"
			}			
		},
		findType: function() {
			if(this.findWay=="phone") {
				return "tel"
			} else if(this.findWay=="email") {
				return "email"
			} else if(this.findWay=="school"){
				return "password"
			}	
		},
	},

	compiled: function() {
		var vuemodel = this
		yy_request.rest_api('get','school/',null,function(status,info) {
			if(status==1) {
				var options = []
				for(var key in info) {
					options.push({
						value: info[key].id,
						text: info[key].name,
						verifyinfo: '验证系统：' + info[key].verify +'(' +info[key].verifyurl +')'
					})
				}
				vuemodel.schoolList = options
			}
		})
	},

	methods: {
		onSchoolChange: function() {
			for(var i in this.schoolList) {
				if(this.schoolList[i].value==this.schoolId) {
					this.verifyInfo = this.schoolList[i].verifyinfo
				}
			}
      refreshCode(this)
		},

		onSubmit: function() {
			if(this.findWay=="phone") {
				sendPhoneCode(this)
			} else if(this.findWay=="email") {
				sendEmailCode(this)
			} else if(this.findWay=="school") {
				verifyUserSchool(this)
			}
		},
	},  

	components: {
    'my-select': require('../controls/my-select.vue'),
  }


}

function refreshCode(vuemodel) {
  var refreshCodeAPI = 'school/' + vuemodel.schoolId + '/code/'
  yy_request.rest_api('get',refreshCodeAPI,null,function(status,info) {
    if(status==1) {
      vuemodel.$$.verifycode.src = info.img
      vuemodel.showCode = true
    } else {
      vuemodel.showCode = false
    }
  })
}

function sendPhoneCode(vuemodel) {
	var ajax_data = {
		number: vuemodel.findId,
		phone: vuemodel.findInfo,
	}
  yy_request.rest_api('post','password/phone',ajax_data,function(status,info) {
    if(status==1) {
    	alert("验证码发送成功")
    } else {
      alert(info)
    }
  })	
}

function sendEmailCode(vuemodel) {
	var ajax_data = {
		number: vuemodel.findId,
		email: vuemodel.findInfo,
	}
  yy_request.rest_api('post','password/email',ajax_data,function(status,info) {
    if(status==1) {
    	alert("验证码发送成功")
    } else {
      alert(info)
    }
  })	
}

function verifyUserSchool(vuemodel) {
	var ajax_data = {
		number: vuemodel.findId,
		password: vuemodel.findInfo,
		code: vuemodel.code,
	}
  yy_request.rest_api('post','password/verify',ajax_data,function(status,info) {
    if(status==1) {
    	alert("验证成功")
    } else {
      alert(info)
    }
  })	
}

</script>

<style>
.forget-view {
	position: relative;
}

.forget-view > .well {
  margin-left: 16.777777%;
  margin-right: 16.777777%;
  min-height: 55%;
  background-color: #edeff1;
}	

.find-title {
	margin-top: 30px;
}

.input-group {
	margin-bottom: 10px;
}

</style>