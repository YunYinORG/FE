var Vue = require('vue')
var app = new Vue(require('./app.vue'))

var po = require('./js/public_object.js')
po.app = app

window.bb = app

var Router = require('director').Router
var router = new Router()

router.on('/intro', function (page) {
  app.view = 'intro-view'
})

router.on('/menu', function (page) {
  	app.view = 'menu-view'
})

router.on('/print', function (page) {
  app.view = 'print-view'
})

router.on('/share', function (page) {
  app.view = 'share-view'
})

router.on('/book', function (page) {
  app.view = 'textbook-view'
})

router.on('/file', function (page) {
  app.view = 'file-view'
})

router.on('/user', function (page) {
  app.view = 'user-view'
})

router.on('/forget', function (page) {
  app.view = 'forget-view'
})

router.init('/intro')