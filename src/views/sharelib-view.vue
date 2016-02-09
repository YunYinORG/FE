<template>
  <h5 class="book-header text-center">寻找同学们分享的资料</h5>
  <div class="list-view col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8">
    <div class="book-search-wrapper input-group col-xs-12 col-sm-8 col-sm-offset-2">
      <input type="text" class="form-control" placeholder="试一试搜索: 线性代数" 
        v-model="searchKey"
        v-on="keyup: onSearchBook | key 'enter'">
      <span class="input-group-btn">
        <button class="btn btn-default" type="button" v-on="click: onSearchBook">搜索</button>
      </span>
    </div>
    <div class="text-center" v-show="tips!=''">
      <small>{{tips}}</small>
    </div>
    <div class="book-list">
      <div class="bk-wrapper" v-repeat="book:bookList" v-on="click: showBookDetail(book)">
        <div class="bk-name"><strong>{{book.name}}</strong></div>
        <!-- <div class="bk-detail"><small>{{book.detail}}</small></div> -->
      </div>
    </div>
    <div class="row">
      <div class="text-center" v-show="moreData" v-on="click: loadMore" style="cursor:pointer">加载更多</div>
    </div>
  </div>
  <modal show="{{@showDetailModal}}" width="{{modalWidth}}" default-title="{{modalTitle}}">
    <div class="modal-body">
      <p><strong>书名: </strong> {{bookInfo.name}}</p>
      <p><strong>详细说明: </strong> {{bookInfo.detail}}</p>
      <p><strong>所属打印店: </strong> {{bookInfo.printer}}</p>
      <p><strong>价格: </strong> {{bookInfo.price}} 元</p>
      <p><strong>上传时间: </strong> {{bookInfo.time}}</p>
    </div>   
    <div class="modal-footer">
      <button class="btn btn-primary btn-wide btn-warning" v-on="click: showDetailModal = false">取消</button>
      <button class="btn btn-primary btn-wide" v-on="click: onBuy">预定</button>
    </div>    
  </modal>
</template>
<script>
var yy_request = require('../js/yunyin_request')
var po = require('../js/public_object.js')

module.exports = {
  data: function() {
    return {
      searchKey: "",
      latestKey: "",
      booksPerPage: 10,
      bookList: [],
      displayedPage: 1,
      moreData: false,
      tips:"那些你找了很久的绝版图书，稀有课件，复习资料也许就静静躺在在某个打印店里呢",
      showDetailModal: false,
      modalWidth: 600,
      modalTitle: "图书详情",
      bookInfo: {name:"",detail:"",printer:"",price:"",time:""},
    }
  },

  complied: function() {

  },

  methods: {
    onSearchBook: function() {
      this.displayedPage = 1
      this.latestKey = this.searchKey
      loadData(this, this.searchKey)
    },

    loadMore: function() {
      this.displayedPage += 1
      loadData(this, this.latestKey)
    },

    showBookDetail: function(book) {
      var vuemodel = this
      yy_request.rest_api({
        method: 'get',
        api: 'books/' + book.id,
        opSuccess: function(info) {
          vuemodel.bookInfo = info
        },
      })
      this.showDetailModal = true
    },

    onBuy: function() {
      this.showDetailModal = false
    }
  },

  components: {
    'modal': require('../components/modal.vue'),
  }
}

function loadData(vuemodel,keywords) {
  var ajax_data = {
    key: keywords,
    page: vuemodel.displayedPage
  }

  yy_request.rest_api({
    method: 'get',
    api: 'share/search',
    data: ajax_data,
    opSuccess: function(info) {
      if(info.length>0) {
        vuemodel.tips = ""
        var bookdata = info
        if(bookdata.length==vuemodel.booksPerPage) {
          vuemodel.moreData = true
        } else {
          vuemodel.moreData = false
        }

        if(vuemodel.displayedPage==1) {
          vuemodel.bookList = bookdata
        } else {
          vuemodel.bookList = vuemodel.bookList.concat(bookdata)       
        }        
      } else {
        vuemodel.bookList = []
        vuemodel.tips = "没有找到结果，不如换个关键词试试"
      }
    },
  })
}



</script>

<style>
.book-search-wrapper {
  margin-top: 20px;
  margin-bottom: 10px;
}
.bk-wrapper {
  cursor: pointer;
  margin-bottom: 10px;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 3px;
}

.bk-wrapper:hover {
  background: #ffffff;
}
.bk-name {
  color: #0BBD9E;
}
</style>
