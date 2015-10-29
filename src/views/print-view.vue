<template>
<div class="row">
	<div class="list-view col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8">
  		<tasklist></tasklist>		
	</div>
</div>
</template>
<script>

module.exports = {
	data: function() {
		return {
			showTaskModal:false,
		}
	},

  components: {
    'tasklist': require('../components/tasklist.vue'),
  }
}

</script>