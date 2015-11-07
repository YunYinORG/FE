<template>
	<div class="myselect-wrapper">			
		<div class="btn-wrapper" v-on="click: showChoices = !showChoices">
			<div class="chosen-text">
				<span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
				<small>{{displayText}}</small>	
			</div>
		</div>
		<div v-if="showChoices" class="choice-wrapper">
			<div class="desc-wrapper"><small style="color:#888888">{{desc}}</small></div>
			<div class="option-wrapper" v-repeat="option in options"
				v-on="click: onChoose($event,option)"><small>{{option.text}}</small></div>
		</div>
	</div>

</template>

<script>
module.exports = {
  props: ["options","value","desc","onSelectChange"],
  
  data: function () {
    return {
    	chosenOption: null,
    	showChoices: false,
    	lastValue: null,
    }
  },

  computed: {
  	displayText: function() { 		
  		if(this.value!=this.lastValue && typeof(this.onSelectChange)=='function') {
  			this.onSelectChange()
  		}
  		this.lastValue = this.value

  		for(var i in this.options) {
  			if(this.options[i].value==this.value) {
  				return this.options[i].text
  			}
  		}
			return this.desc
  	}
  },

  methods: {
  	onChoose: function($event,option) {
  		this.value = option.value
  		this.showChoices = false
  	}
  },

  // components: {	

  // },
}
</script>

<style>
	.myselect-wrapper {
		width: 100%;
		height: 41px;
		/*z-index: 9999;*/
		overflow: visible;
		background: #0BBD9E;
		border-radius: 3px;
		margin-bottom: 20px;
		cursor: pointer;
	}

	.myselect-wrapper .btn-wrapper {
		padding-left: 10px;
		width: 100%;
		height: 41px;
		line-height: 41px;
		color: #FFFFFF;		
	}

	.myselect-wrapper .chosen-text span {
		float: right;	
		line-height: 41px;
		margin-right: 10px; 
	}

	.myselect-wrapper .choice-wrapper {
		z-index: 9999;
		position: relative;
		background: #F3F4F5;
		opacity: 1;
		margin-top: 10px;	
		border-radius: 3px;
		max-height: 300px;
		overflow:scroll;
	}

	.myselect-wrapper .choice-wrapper div{
		height: 35px;
		line-height: 35px;
		padding-left: 10px;
		background: #F3F4F5;
		-webkit-transition: background .5s ease;
		-o-transition: background .5s ease;
		transition: background .5s ease;
	}

	.myselect-wrapper .choice-wrapper div.option-wrapper:hover{
		background: #E1E4E7;
		-webkit-transition: background .5s ease;
		-o-transition: background .5s ease;
		transition: background .5s ease;
	}

	.chosen-text,
	.option-wrapper {
		text-overflow:ellipsis;
		white-space:nowrap;
		overflow:hidden
	} 
</style>