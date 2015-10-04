<template>
  <div id="header">
  </div>
  <component is="{{view}}"
    keep-alive
    v-transition
    trnsition-mode="out-in">
  </component>
  <login-modal show="{{@showLoginModal}}"></login-modal>
</template>

<script>
module.exports = {
  el: '#app',
  data: function () {
    return {
      view: 'intro-view',
      showLoginModal: false,
    }
  },
  components: {
    'intro-view': require('./views/intro-view.vue'),
    'home-view': require('./views/home-view.vue'),
    'login-modal': require('./components/login-modal.vue'),
  }
}
</script>

<style>

</style>