<template id="modal-template">
  <div class="modal-mask" v-show="show" v-transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container" v-style="width: width+'px' ">
        <div class="modal-header">
          {{defaultTitle}}
          <button class="modal-default-button"
            v-on="click: show = false">
            关闭
          </button>
        </div>
        <content select=".modal-body">
          <div class="modal-body">
            default body
          </div>
        </content>
        <content select=".modal-footer">
          <div class="modal-footer">
            default footer
          </div>
        </content>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true,
    },
    width: {
      type: Number,
      default: 300,
    },
    defaultTitle: {
      type: String,
    }
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * the following styles are auto-applied to elements with
 * v-transition="modal" when their visiblity is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter, .modal-leave {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}  

</style>