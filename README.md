# 云印前端

前端vue组件构建形式参考[vue-hackernews](https://github.com/vuejs/vue-hackernews)项目构建

##目录组织形式（临时）
>
```
.
├── index.html          首页html
├── webpack.config.js   webpack打包配置文件
├── build               打包编译输出目录
│   ├── build.js             webpack打包生成的主js文件
│   └── build.js.map         sourcemap  
└── src                 源代码目录
    ├── main.js              webpack打包入口js
    ├── app.vue              vue主视图模块
    ├── components           vue基础组件目录
    │   ├── filelist.vue               文件列表组件          
    │   ├── login.vue                  登陆框组件
    │   ├── upload.vue                 上传框组件
    │   └── userinfo.vue               用户信息组件
    ├── views                vue分视图组件目录
    │   ├── home-view.vue              HOME视图组件
    │   ├── file-view.vue              文件视图组件
    │   ├── login-view.vue             登陆视图组件
    │   ├── print-view.vue             打印视图组件
    │   ├── share-view.vue             分享视图组件
    │   ├── textbook-view.vue          教材视图组件
    │   ├── upload-view.vue            上传视图组件
    │   └── user-view.vue              用户视图组件
    ├── filters              vue过滤器目录
    ├── css                  样式表目录
    ├── img                  图片资源目录
    └── js                   js包目录
        └── yunyin_request.js           ajax－API通讯对象  
```
>>

##测试说明

### Building
``` bash
sudo npm install
# watch:
npm run dev
# build:
npm run build
```
将目录置于vagrant测试环境的前端文件夹下，访问[http://127.0.0.1:8888/front/index.html](http://127.0.0.1:8888/front/index.html)

##待解决问题
+ 使用iframe跨子域名的ajax请求问题
+ AJAX请求中加入requestedwith XMLHttpRequest header 