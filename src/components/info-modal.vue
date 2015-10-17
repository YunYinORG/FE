<template>
  <modal show="{{@show}}" width="{{modalWidth}}" default-title="{{title}}">
    <div class="modal-body">
      <h5 class="text-center text-primary">{{infoText}}</h5>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary btn-wide" v-on="click: show=false">确定</button>
    </div>    
  </modal>
</template>

<script>

var yy_request = require('../js/yunyin_request')

module.exports = {
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true,
    },
    infoText: String,
  },

  data: function () {
    return {
      modalWidth: 600,
      title: "提示信息",
    }
  },

  components: {
    'modal': require('./modal.vue'),
  }
}




</script>

<style>
</style>