var po = require('./js/public_object.js')

var yy_request = require('./js/yunyin_request')

var Vue = require('vue')

var loadingInfo = document.getElementById('loading-info')
loadingInfo.textContent = "正在初始化用户信息"

function get_school_info() {
	loadingInfo.textContent = "正在读取学校列表"
	yy_request.rest_api({
	  method: 'get',
	  api: 'school/',
	  opSuccess: function(info) {
	    po.schoolsinfo = info
	    loadingInfo.textContent = "正在进入应用"
	    var app = new Vue(require('./app.vue'))
		po.app = app
		init_router()
	  },
	})
}

function init_router() {
	var app = po.app
	var Router = require('director').Router
	var router = new Router()

	router.on('/intro', function () {
	  app.view = 'intro-view'
	})

	router.on('/home', function () {
		app.view = 'menu-view'
	})

	router.on('/task', function () {
		if(po.islogin) {
	  	app.view = 'task-view'		
		} else {
			app.showLoginModal = true
			window.location.hash = '#/home'
		}
	})

	router.on('/share', function () {
		if(po.islogin) {
	  	app.view = 'share-view'		
		} else {
			app.showLoginModal = true
			window.location.hash = '#/home'
		}
	})

	router.on('/book', function () {
		if(po.islogin) {
	  	app.view = 'book-view'		
		} else {
			app.showLoginModal = true
			window.location.hash = '#/home'
		}
	})

	router.on('/file', function () {
		if(po.islogin) {
	  	app.view = 'file-view'		
		} else {
			app.showLoginModal = true
			window.location.hash = '#/home'
		}
	})

	router.on('/user', function () {
		if(po.islogin) {
	  	app.view = 'user-view'		
		} else {
			app.showLoginModal = true
			window.location.hash = '#/home'
		}
	})

	router.on('/printer', function () {
	  	app.view = 'printer-view'		
	})

	router.on('/forget', function () {
	  app.view = 'forget-view'
	})

	router.init('/home')	
}

yy_request.rest_api({
	method: 'get',
	api: 'user/',
	opSuccess: function(info) {
    	po.islogin = true
    	po.userinfo = info.user
    	get_school_info()
    },
	opFail: function() {
    	po.islogin = false
    	get_school_info()
    },
	authFail: function() {
    	po.islogin = false
    	get_school_info()
    },
})


