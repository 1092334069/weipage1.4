<template>
	<div class="image plugin" :data-id="viewData.pluginId" :style="parseNormalStyle()">
		<img v-if="viewData.base.data" :src="viewData.base.data" />
		<Icon class="default" v-else type="ios-image-outline" size="100" />
		<Icon size="12" class="drop-icon" type="md-move" />
		<Icon size="12" class="resize-icon" type="md-resize" />
	</div>
</template>

<script>
	import styleView from '../styleView.js'

	export default {
		name: "imageView",
		props: {
			viewData: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data () {
		    return {}
		},
		methods: styleView
	}
</script>

<style scoped>
	.image{
		display: inline-block;
		position: relative;
	}
	.image img{
		width: 100%;
		height: 100%;
	}
	.image .default{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
</style>