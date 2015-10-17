<template>
	<div class="user-view">
		<div class="text-center">
			<h3>个人信息</h3>
		</div>
		<div class="well" id="userinfo">
			<div id="user_name" class='well'>
				<div class="row">
					<div class="col-xs-3 col-sm-offset-1">姓名</div>
					<span class="col-sm-6" v-text="userName"></span>
				</div>
			</div>
			<div id="user_school" class='well'>
				<div class="row">
					<div class="col-xs-3 col-sm-offset-1">学校</div>
					<span class="col-sm-6" v-text="userSch"></span>
				</div>
			</div>
			<div id="user_sch_id" class='well'>
				<div class="row">
					<div class="col-xs-3 col-sm-offset-1">学号</div>
					<span class="col-sm-6" v-text="userSID"></span>
				</div>
			</div>
			<div id="user_tel" class='well'>
				<div class="row detail">
					<div class="col-xs-3 col-sm-offset-1">手机</div>
					<span class='info col-sm-6' v-text="userPhone"></span>
					<span class='col-sm-1 glyphicon glyphicon-pencil' v-on="click: showPhoneEdit=!showPhoneEdit"></span>
				</div>
				<div id="phone-wrapper" v-if="showPhoneEdit" v-transition="expand">
					<div class="input-group row col-sm-offset-1 col-sm-10" style='margin-top:10px'>
						<span class="input-group-addon">+86</span>
						<input type="text" placeholder='你的手机号' class="form-control"/>
						<span class="input-group-btn">
							<button class='btn btn-primary'><span class="glyphicon glyphicon-check"></span>验证</button>
							<span class='btn btn-default cancel' v-on="click: showPhoneEdit=false">
								<span class="glyphicon glyphicon-remove"></span>
							</span>
						</span>
					</div>
				</div>
			</div>
			<div id="user_mail" class='well'>
				<div class="row detail">
					<div class='col-xs-3 col-sm-offset-1'>邮箱</div>
					<span class='info col-sm-6' v-text="userMail"></span>
					<span class='col-sm-1 glyphicon glyphicon-pencil' v-on="click: showMailEdit=!showMailEdit"></span>
				</div>
				<div id="mail-wrapper" v-if="showMailEdit" v-transition="expand">
					<div class='input-group row col-sm-offset-1 col-sm-10' style='margin-top:10px'>
						<input type="email" placeholder='你的常用邮箱' class="form-control" v-model="newMail"/>
						<span class="input-group-btn">
							<button class='btn btn-primary' v-on="click: onVerifyMail">
								<span class="glyphicon glyphicon-check"></span>验证
							</button>
							<span class='btn btn-default cancel' v-on="click: showMailEdit=false">
								<span class="glyphicon glyphicon-remove"></span>
							</span>
						</span>
					</div>			
				</div>
			</div>
			<div id="user_pwd" class='well'>
				<div class="row detail">
					<div class="col-xs-3 col-sm-offset-1">
						密码
					</div>
					<span class="col-sm-6">********</span>
					<span class='col-sm-1 glyphicon glyphicon-pencil' v-on="click: showPasswordEdit=!showPasswordEdit"></span>
				</div>
				<div class='password-reset row col-sm-offset-1' style='margin-top:10px' v-if="showPasswordEdit" v-transition="expand">
					<div class="input-group col-sm-10 ip">
						<span class="input-group-addon">当前密码</span>
						<input class="form-control" placeholder='正在使用的密码' type="password" required v-model="oldPwd">
					</div>
					<div class="input-group col-sm-10 ip">
						<span class="input-group-addon">新的密码</span>
						<input class="form-control" placeholder='要设置的密码' type="password" required v-model="newPwd">
					</div>
					<div class="input-group col-sm-10 ip">
						<span class="input-group-addon">确认密码</span>
						<input  class="form-control" placeholder='重复刚设置的密码' type="password" required v-model="newPwdRepeat">
					</div>
					<br/>
					<div class="input-group text-center row col-sm-10">
						<button class="btn btn-embossed btn-primary col-sm-4 col-sm-offset-1"
							v-on="click: onChangePassword">确定</button>
						<span class='cancel btn btn-embossed btn-primary col-sm-4 col-sm-offset-2'
							v-on="click: showPasswordEdit=false">取消</span>
					</div>
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
			uid: '',
			userName: '',
			userSID: '',
			userSch: '',
			userPhone: '',
			userMail: '',
			showPhoneEdit: false,
			showMailEdit: false,
			showPasswordEdit: false,
			newMail: '',
			oldPwd: '',
			newPwd: '',
			newPwdRepeat: '',
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
				var ajax_data = {
					old: md5(this.oldPwd),
					password: md5(this.newPwd)
				}
				yy_request.rest_api('put','user/'+this.uid,ajax_data,function(status,info){
					if(status==1) {
						po.app.infoModalText = "密码修改成功"
						po.app.showInfoModal = true
						vuemodel.showPasswordEdit = false
					} else {
						po.app.infoModalText = info
						po.app.showInfoModal = true
					}
				})
			}
		},

		onVerifyMail: function() {
			var ajax_data = {
				email: this.newMail
			}
			yy_request.rest_api('post',"user/"+this.uid+"/email",ajax_data,function(status,info){
				if(status==1) {
					po.app.infoModalText = info
					po.app.showInfoModal = true
					vuemodel.showMailEdit = false
				}
			})
		},
	},
}


function get_user_detail(vuemodel) {
	yy_request.rest_api('get','user/',null,function(status,info){
		if(status==1) {
			vuemodel.uid = info.id
			yy_request.rest_api('get','user/'+vuemodel.uid,null,function(status,info){
				if(status==1) {
					vuemodel.userName = info.name
					vuemodel.userSID = info.number
					vuemodel.userSch = info.school 
					vuemodel.userPhone = info.phone || "还没有绑定手机" 
					vuemodel.userMail = info.email || "还没有绑定邮箱"
				}
			})
		}
	})
}

</script>

<style>
.user-view {
	position: relative;
}

.user-view > .well{
    margin-left: 16.777777%;
    margin-right: 16.777777%;
    min-height: 55%;
    background-color: #edeff1;
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

.password-reset .ip {
	margin-top: 5px;
}


</style>