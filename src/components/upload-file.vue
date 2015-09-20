<template>
	<div id="wrapper">
		<div id="file-logo">
			<!-- <img src="" alt=""> -->
		</div>
		<div id="file-name" v-text="fileobject.name"></div>
		<div id="upload-status">
			<div class="outer-line">
				<div class="inner-line" v-text="status"></div>
			</div>
		</div>
		<div id="delete">
			<input type="button" v-on="click: onRemove($index)" value="删除">
		</div>
	</div>
</template>

<script>
module.exports = {
	props:['onRemove']
}
</script>

<style>
/*	#wrapper>div {
		display: inline;
	}
*/</style>