<template id="modal-template">
  <div class="modal-mask" v-show="show" v-transition="modal" v-class="open: bodyModalOpen">
    <div class="modal-wrapper">
      <div class="modal-container" v-style="max-width: width+'px' ">
        <div class="modal-header">
          <strong>{{defaultTitle}}</strong>
          <button type="button" class="close"
            v-on="click: show = false">
            <span aria-hidden="true">&times;</span>
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
    },
  },

  computed: {
    bodyModalOpen: function(){
      if(this.show) {
        var bd = document.getElementsByTagName('body')[0]
        bd.classList.add('modal-open')
        return true
      } else {
        var bd = document.getElementsByTagName('body')[0]
        bd.classList.remove('modal-open')
        return false
      }
    },
  },

}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9000;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .5);
  /*display: table;*/
  transition: opacity .3s ease;
  overflow-x: hidden;
  overflow-y: auto;
}

.modal-wrapper {
  position: relative;
  margin: 20px auto;
  top: 40px;
  transition: all .3s ease;
}

.modal-container {
  /*overflow-y: scroll;*/
  margin: 0px auto;
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;

}

.modal-body {
  margin: 10px 0;
  padding: 5px 15px;
}

.modal-default-button {
  float: right;
}

.modal-enter, .modal-leave {
  opacity: 0;
}

.modal-enter .modal-wrapper,
.modal-leave .modal-wrapper {
  top: -80px;
}  

@media screen and (max-width: 767px) {
  .modal-wrapper {
  top: 20px;
  }

  .modal-enter .modal-wrapper,
  .modal-leave .modal-wrapper {
  opacity: 0;
  top: 20px;
  }
  
}

</style>