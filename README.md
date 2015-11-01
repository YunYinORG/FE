# 云印前端

前端基于vue组件构建

##目录组织形式
>
```
.
├── index.html          首页html
├── debug.html          调试也
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

本地开发调试请使用[云印vagrant](https://github.com/YunYinORG/vagrant)

自动更新代码 `cd /var/www/front/; webpack -w` 

release代码 `npm run p`