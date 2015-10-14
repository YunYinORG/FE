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
						<input type="email" placeholder='你的常用邮箱' class="form-control"/>
						<span class="input-group-btn">
							<button class='btn btn-primary'><span class="glyphicon glyphicon-check"></span>验证</button>
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
					<span class="col-sm-6">初始密码为学号</span>
					<span class='col-sm-1 glyphicon glyphicon-pencil' v-on="click: showPasswordEdit=!showPasswordEdit"></span>
				</div>
				<div class='password-reset row col-sm-offset-1' style='margin-top:10px' v-if="showPasswordEdit" v-transition="expand">
					<form>
						<div class="input-group col-sm-10 ip">
							<span class="input-group-addon">当前密码</span>
							<input class="form-control" placeholder='正在使用的密码' type="password" required>
						</div>
						<div class="input-group col-sm-10 ip">
							<span class="input-group-addon">新的密码</span>
							<input class="form-control" placeholder='要设置的密码' type="password" required>
						</div>
						<div class="input-group col-sm-10 ip">
							<span class="input-group-addon">确认密码</span>
							<input  class="form-control" placeholder='重复刚设置的密码' type="password" required>
						</div>
						<br/>
						<div class="input-group text-center row col-sm-10">
							<button type="submit" class="btn btn-embossed btn-primary col-sm-4 col-sm-offset-1">确定</button>
							<span class='cancel btn btn-embossed btn-primary col-sm-4 col-sm-offset-2'
								v-on="click: showPasswordEdit=false">取消</span>
						</div>
					</form>
				</div>
			</div>
		</div>
<!-- 		<input type="button" value="退出登录">
		<input type="button" value="信息有误？">
		<div class="auth-wrapper">
			<div><sapn>姓名: </span> <span v-text="userName"></span> </div>
			<div><sapn>学生卡号: </span> <span v-text="userSID"></span> </div>
			<div><sapn>学校名称: </span> <span v-text="userSch"></span> </div>
		</div>
		<div class="info-wrapper">
			<div><sapn>手机: </span> <span v-text="userPhone"></span> <span v-on="click: verifyPhone"></span></div>
			<div><sapn>邮箱: </span> <span v-text="userMail"></span> <span v-on="click: verifyMail"></span></div>		
		</div>
		<div class="pw-wrapp">
			<div><sapn v-on="click: changePassword">修改密码 </span>
		</div> -->
	</div>
</template>

<script>
var yy_request = require('../js/yunyin_request')

module.exports = {
	data: function() {
		return {
			userName: '',
			userSID: '',
			userSch: '',
			userPhone: '',
			userMail: '',
			showPhoneEdit: false,
			showMailEdit: false,
			showPasswordEdit: false,
		}
	},

	compiled: function() {
		get_user_detail(this)
	},
}


function get_user_detail(vuemodel) {
	yy_request.rest_api('get','user/',null,function(status,info){
		if(status==1) {
			var uid = info.id
			yy_request.rest_api('get','user/'+uid,null,function(status,info){
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