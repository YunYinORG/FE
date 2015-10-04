<template>
	<input type="button" value="退出登录">
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

</style>