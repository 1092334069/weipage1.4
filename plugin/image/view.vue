<template>
	<div class="image plugin" :class="{current: selectPluginId === viewData.pluginId}" :data-id="viewData.pluginId" :style="parseNormalStyle()">
		<img v-if="viewData.base.data" :src="viewData.base.data" />
		<Icon size="12" class="drop-icon" type="md-move" />
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
			},
			selectPluginId: {
				type: String,
				default: ''
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
		display:inline-block;
		position:relative;
	}
	.image img{
		width:100%;
	}
</style>