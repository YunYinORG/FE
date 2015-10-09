<template>
	<div class="file-view">
  		<filelist></filelist>		
	</div>
</template>

<script>

module.exports = {

  components: {
    'filelist': require('../components/filelist.vue'),
  }
}

</script>

<style>
.file-view	{
	position: relative;
	margin-left: 16.777777%;
    margin-right: 16.777777%;
    min-height: 55%;
    background-color: #edeff1;
    padding: 10px 30px;
    border-radius: 5px;

}

</style>