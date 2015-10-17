<template>
	<div class="print-view">
		<tasklist></tasklist>		
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

<style>
.print-view	{
	position: relative;
	margin-left: 16.777777%;
    margin-right: 16.777777%;
    min-height: 55%;
    background-color: #edeff1;
    padding: 10px 30px;
    border-radius: 5px;
}

</style>