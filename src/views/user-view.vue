<template>
	<div class="user-view">
		<div class="text-center">
			<h3><strong v-text="userName">我</strong>的信息</h3>
		</div>
		<div class="row">
			<div class="well col-xs-12 col-sm-8 col-sm-offset-2" id="userinfo">
				<div id="user_name" style="margin-bottom: 15px">
					<div class="row text-center text-info">
					<span v-text="userSID">学号</span>(<span v-text="userSch">学校</span>)
					</div>
				</div>
			<!-- 	<div id="user_school" class='well'>
					<div class="row">
						<div class="col-xs-4 col-sm-2 text-right">学校</div>
						<span class="col-xs-8 col-sm-8 col-sm-offset-2 text-info" v-text="userSch"></span>
					</div>
				</div> -->
				<div id="user_tel" class='well'>
					<div class="row detail">
						<div class="col-xs-4 col-sm-2 text-right">手机</div>
						<span class='col-xs-6 col-sm-7 col-sm-offset-2 text-primary' v-text="userPhone"></span>
						<span class='col-xs-2 col-sm-1 glyphicon glyphicon-pencil' v-on="click: showPhoneEdit=!showPhoneEdit"></span>
					</div>
					<div id="phone-wrapper"  v-if="showPhoneEdit" v-transition="expand">
						<div class="input-group col-xs-12" style='margin-top:10px'>
							<span class="input-group-addon">+86</span>
							<input type="text" placeholder='你的手机号' class="form-control" v-model="newPhone"/>
							<span class="input-group-btn">
								<button class='btn btn-primary' v-on="click: onBindPhone">
									<span class="glyphicon glyphicon-check"></span>绑定
								</button>
							</span>
						</div>
					</div>
				</div>
				<div id="user_mail" class='well'>
					<div class="row detail">
						<div class='col-xs-4 col-sm-2 text-right'>邮箱</div>
						<span class='col-xs-6 col-sm-7 col-sm-offset-2 text-primary' v-text="userMail"></span>
						<span class='col-xs-2 col-sm-1 glyphicon glyphicon-pencil pull-right' v-on="click: showMailEdit=!showMailEdit"></span>
					</div>
					<div id="mail-wrapper" v-if="showMailEdit" v-transition="expand">
						<div class='input-group' style='margin-top:10px'>
							<input type="email" placeholder='你的常用邮箱' class="form-control" v-model="newMail"/>
							<span class="input-group-btn">
								<button class='btn btn-primary' v-on="click: onBindMail">
									<span class="glyphicon glyphicon-check"></span>绑定
								</button>
							</span>
						</div>			
					</div>
				</div>
				<div id="user_pwd" class='well'>
					<div class="row detail">
						<div class="col-xs-4 col-sm-2 text-right">
							密码
						</div>
						<span class="col-xs-6 col-sm-7 col-sm-offset-2 text-primary">********</span>
						<span class='col-xs-2 col-sm-1 glyphicon glyphicon-pencil pull-right' v-on="click: showPasswordEdit=!showPasswordEdit"></span>
					</div>
					<div id='password-reset' style='margin-top:10px' v-if="showPasswordEdit" v-transition="expand">
						<div class="input-group ip">
							<span class="input-group-addon">当前密码</span>
							<input class="form-control" placeholder='正在使用的密码' type="password" required v-model="oldPwd">
						</div>
						<div class="input-group ip">
							<span class="input-group-addon">新的密码</span>
							<input class="form-control" placeholder='要设置的密码' type="password" required v-model="newPwd">
						</div>
						<div class="input-group ip">
							<span class="input-group-addon">确认密码</span>
							<input  class="form-control" placeholder='重复刚设置的密码' type="password" required v-model="newPwdRepeat">
						</div>
						<br/>
						<div class="row">
							<button class="btn btn-embossed btn-primary col-xs-4 col-xs-offset-1"
								v-on="click: onChangePassword">确定</button>
							<button class='cancel btn btn-embossed btn-primary col-xs-4 col-xs-offset-2'
								v-on="click: showPasswordEdit=false">取消</button>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	</div>
  <verifycode-modal show="{{@showCodeModal}}"
  	stage = "{{verifyStage}}" 
    verify-type = "bind"
    verify-way="{{verifyWay}}"
    verify-info="{{verifyInfo}}"
    user-id="{{uid}}"></verifycode-modal>
</template>

<script>
var yy_request = require('../js/yunyin_request')
var po = require('../js/public_object.js')
var md5 = require("blueimp-md5")

module.exports = {
	data: function() {
		return {
			uid: '',
			userName: '',
			userSID: '',
			userSch: '',
			userPhone: '',
			userMail: '',
			showPhoneEdit: false,
			showMailEdit: false,
			showPasswordEdit: false,
			newPhone: '',
			newMail: '',
			oldPwd: '',
			newPwd: '',
			newPwdRepeat: '',
			showCodeModal: false,
			verifyStage: 'code',
			verifyWay:'',
			verifyInfo:'',

		}
	},

	compiled: function() {
		get_user_detail(this)
	},

	methods: {
		onChangePassword: function() {
			var vuemodel = this
			if(this.newPwd!=this.newPwdRepeat) {
				po.app.infoModalText = "两次密码输入不一致"
				po.app.showInfoModal = true
			} else {
			  yy_request.rest_api({
			    method: 'put',
			    api: 'user/' + this.uid,
			    data: {
						old: md5(this.oldPwd),
						password: md5(this.newPwd)			    
			    },
			    opSuccess: function(info) {
						po.app.infoModalText = "密码修改成功"
						po.app.showInfoModal = true
						vuemodel.showPasswordEdit = false
			    },
			    opFail: function(info) {
						po.app.infoModalText = info
						po.app.showInfoModal = true
			    },
			  })
			}
		},

		onBindPhone: function() {
			var vuemodel = this
		  yy_request.rest_api({
		    method: 'post',
		    api: "user/"+this.uid+"/phone",
		    data: {
  				phone: this.newPhone  
		    },
		    opSuccess: function(info) {
					vuemodel.verifyStage = 'code'
					vuemodel.verifyWay = 'phone'
					vuemodel.verifyInfo = vuemodel.newPhone
					vuemodel.showCodeModal = true
		    },
		    opFail: function(info) {
					po.app.infoModalText = info
					po.app.showInfoModal = true
		    },
		  })
		},


		onBindMail: function() {
			var vuemodel = this
		  yy_request.rest_api({
		    method: 'post',
		    api: "user/"+this.uid+"/email",
		    data: {
					email: this.newMail
		    },
		    opSuccess: function(info) {
					vuemodel.verifyStage = 'code'
					vuemodel.verifyWay = 'email'
					vuemodel.verifyInfo = vuemodel.newMail
					vuemodel.showCodeModal = true
		    },
		    opFail: function(info) {
					po.app.infoModalText = info
					po.app.showInfoModal = true
		    },
		  })
		},
	},

	components: {
    'verifycode-modal': require('../components/verifycode-modal.vue'),
	}
}

function get_user_detail(vuemodel) {
  yy_request.rest_api({
    method: 'get',
    api: 'user/',
    opSuccess: function(info) {
    	vuemodel.uid = info.id
    	yy_request.rest_api({
    		method: 'get',
    		api: 'user/'+vuemodel.uid,
    		opSuccess: function(info) {
					vuemodel.userName = info.name
					vuemodel.userSID = info.number
					vuemodel.userSch = info.school 
					vuemodel.userPhone = info.phone || "还没有绑定手机" 
					vuemodel.userMail = info.email || "还没有绑定邮箱"    			
    		}
    	})
    },
  })
}

</script>

<style>
.user-view {
	position: relative;
}

#userinfo > .well{
    padding: 10px;
}

.input-group {
	height: 0;
}
.expand-transition {
	transition: all 0.4s ease;
	overflow: hidden;
	opacity: 1;
	max-height: 250px;
	width: 100%;
}

.expand-enter, .expand-leave {
	opacity: 0;
	width: 0;
	max-height: 0;
}

#password-reset .ip {
	margin-top: 5px;
}


</style>