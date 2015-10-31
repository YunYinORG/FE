<template>
	<div class="myswitch-wrapper">
		<div class="inframe" v-on="click: onSwitch" v-class="off: !value">
			<div class="on-text">
				{{trueText}}
			</div>
			<div class="handle">
			</div>
			<div class="off-text">
				{{falseText}}
			</div>
		</div>
	</div>
</template>

<script>
module.exports = {
	props: {
		"trueText": String,
		"falseText": String,
		"value": Boolean,
	},
  
  data: function () {
    return {
    }
  },

  computed: {
  	displayText: function() {
  		if(this.chosenOption==null) {
  			return this.desc
  		} else {
  			return this.chosenOption.text
  		}
  	}
  },

  methods: {
  	onSwitch: function() {
  		this.value = !this.value
  	},
  },
}
</script>

<style>
.myswitch-wrapper {
	overflow: hidden;
	height: 30px;
	width: 80px;
	border-radius: 4px;
	cursor: pointer;
}

.inframe {
	position: relative;
	width: 140px;
	height: 30px;
	left: 0;
	-webkit-transition: left .3s ease;
	-o-transition: left .3s ease;
	transition: left .3s ease;
}

.inframe.off {
	left: -60px;
	-webkit-transition: left .3s ease;
	-o-transition: left .3s ease;
	transition: left .3s ease;
}

.handle {
	float: left;
	height: 30px;
	width: 20px;
	border-width: 0;
	background-color: #0BBD9E;
}

.on-text, .off-text {
	float: left;
	height: 30px;
	width: 60px;
	border-width: 0;
	text-align: center;
	line-height: 30px;
	color: #0BBD9E;
	background-color: #34495D;
}



</style>