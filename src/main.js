var Vue = require('vue')
var app = new Vue(require('./app.vue'))

var po = require('./js/public_object.js')
po.app = app

window.bb = app

var Router = require('director').Router
var router = new Router()

router.on('/intro', function () {
  app.view = 'intro-view'
})

router.on('/home', function () {
	app.view = 'menu-view'
})

router.on('/print', function () {
	if(po.islogin) {
  	app.view = 'print-view'		
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

router.on('/forget', function () {
  app.view = 'forget-view'
})

router.init('/home')
