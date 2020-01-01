<template>
	<div class="image plugin" :data-id="viewData.pluginId" :style="parseNormalStyle()">
		<img :src="viewData.base.data" />
	</div>
</template>

<script>
	import mobileView from '../mobileView.js'

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
		methods: mobileView
	}
</script>

<style scoped>
	.image{
		display:inline-block;
	}
	.image img{
		width: 100%;
		height: 100%;
	}
</style>