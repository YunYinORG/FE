<template>
  <div class="wrapper">
    <component is="{{view}}"
      keep-alive
      v-transition
      trnsition-mode="out-in">
    </component>   
  </div> 
</template>

<script>
module.exports = {
  data: function () {
    return {
      showUploadModal: false,
      view: 'menu-view',
    }
  },

  components: {
    'menu-view': require('../views/menu-view.vue'),
    'print-view': require('../views/print-view.vue'),
    'file-view': require('../views/file-view.vue'),
    'share-view': require('../views/share-view.vue'),
    'textbook-view': require('../views/textbook-view.vue'),
    'user-view': require('../views/user-view.vue'),
  }

}

</script>

<style>

</style>