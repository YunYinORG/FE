<template>
	<div class="file row">
		<div class="col-xs-1 img-col">
			<img v-el="filelogo">
		</div>
		<div class="col-xs-7">
			<small v-text="fileobject.name"></small>
		</div>
		<div class="col-xs-3">
			<div id="upload-status">
				<div class="outer-line">
					<small v-class="
						text: isuploading,
						text-danger: isfailed,
						text-primary: issuccess"
						v-text="status"></small>
				</div>
			</div>
		</div>
		<div class="col-xs-1 delete-file">
			<span class="glyphicon glyphicon-trash" v-on="click: onRemove($index)"></span>
		</div>
	</div>
</template>

<script>
module.exports = {
	props:['onRemove'],

	compiled: function() {
		var img_src = 'src/img/' + this.fileobject.name.split('.').pop() + '.png'
		this.$$.filelogo.src = img_src
	}
}
</script>

<style>
.file {
	margin-bottom: 5px;
}
.file img {
    width: 80%;
}

.img-col {
	padding: 0;
}

</style>