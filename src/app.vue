<template>
  <login></login>
</template>

<script>
var ajax = require('../yunyin_request')

module.exports = {
  el: '#app',
  components: {
    'login': require('./components/login.vue'),
  }
}
</script>

<style>
</style>