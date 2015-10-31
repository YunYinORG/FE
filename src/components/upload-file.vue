<template>
	<div class="file row">
		<div class="col-xs-3 col-sm-1 img-col">
			<img v-el="filelogo">
		</div>
		<div class="col-xs-9 col-sm-7 filename-wrapper">
			<small v-text="fileobject.name"></small>
		</div>
		<div class="col-xs-7 col-sm-3">
			<div id="upload-status">
				<div class="outer-line">
					<small v-class="
						text: status=='uploading',
						text-danger: status=='fail',
						text-primary: status=='success'">{{info}}
					<u v-if="status=='fail'" v-on="click: onUpload($index)" style="margin-left:10px">重传</u>
					</small>
					<small><a>
				</div>
			</div>
		</div>
		<div class="col-xs-2 col-sm-1 delete-file">
			<span class="glyphicon glyphicon-trash" v-on="click: onRemove($index)"></span>
		</div>
	</div>
</template>

<script>
module.exports = {
	props:['onRemove','onUpload'],

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

.filename-wrapper {
	text-overflow:ellipsis;
	white-space:nowrap;
	overflow:hidden
} 

@media screen and (max-width: 767px) {
	.file img {
		width: 60px;
		height: 60px;
	}
}

.img-col {
	padding: 0;
}
</style>