<template>
  <div class="wrapper">
    <form action="">
      <div>
        学号
        <input type="text" v-model="studentid">
      </div>
      <div>
        密码
        <input type="password" v-model="password">
      </div>
      <div>
        <input id="rmb" type="checkbox" v-model="remeber">
        <label for="rmb">自动登录</label>
        <a href="">忘记密码?</a>
      </div>
      <div>
        <input type="button" v-on="click: onSubmit" value="登陆">
      </div>
    </form>
  </div>
</template>

<script>
var yy_request = require('../js/yunyin_request');

module.exports = {
  data: function() {
    return {
      studentid: '',
      password: '',
      remeber: false,
    }
  },
  methods: {
    onSubmit: function(e) {
      // student id format check
      var reg = /^\d{7}|\d{10}$/;

      if(!reg.test(this.studentid)) {
        alert('请输入格式正确的学号');
      } else {
        yy_request.ajax({
          method: "get",
          url: "../index.php/auth/",
          data: {
            number: this.studentid,
            password: this.password,
          },       
          success: function(x) {
            alert(x)
          },       
          error: function(x) {
            alert(x)
          },
        });
      }
    
    },

  },
}
</script>

<style>
.wrapper {

}
</style>