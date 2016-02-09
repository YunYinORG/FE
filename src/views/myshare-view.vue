<template>
<div class="row">
	<div class="list-view col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8">
  		<mysharelist></mysharelist>
	</div>
</div>
</template>

<script>

module.exports = {

  components: {
    'mysharelist': require('../components/mysharelist.vue'),
  }
}
</script>