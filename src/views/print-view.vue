<template>
	<div class="print-view">
		<input type="button" v-on="增加新任务">
		<tasklist></tasklist>
		<newtask-modal show="showTaskModal" mode="'modify'"></newtask-modal>		
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
    'newtask-modal': require('../components/newtask-modal.vue')
  }
}

</script>

<style>
.print-view {
	position: relative;
}

</style>