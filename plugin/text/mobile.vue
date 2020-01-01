<template>
	<div class="text plugin" :data-id="viewData.pluginId" :style="parseNormalStyle()">
		<span>{{viewData.base.data}}</span>
	</div>
</template>

<script>
	import mobileView from '../mobileView.js'

	export default {
		name: "textView",
		props: {
			viewData: {
				type: Object,
				default: function() {
					return {}
				}
			},
			viewDataIndexList: {
				type: Array,
				default: function() {
					return []
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
	.text{
		display: inline-block;
		max-width: 100%;
		word-wrap: break-word;
	}
</style>