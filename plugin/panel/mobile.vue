<template>
	<div class="panel plugin" 
		:id="viewData.pluginId"
		:class="viewData.base.type"
		:style="parseNormalStyle()"
		@click="doEvent(viewData.pluginId, viewData.indexs)">
			<template v-for="item in viewData.pluginList">
				<panelView 
					v-if="item.pluginType == 'panel'"
					:viewData="item"
					@do-event="doEvent"
				></panelView>
				<textView
					v-else-if="item.pluginType == 'text'"
					:viewData="item"
				></textView>
				<imageView
					v-else-if="item.pluginType == 'image'"
					:viewData="item" 
				></imageView>
				<formView
					v-else-if="item.pluginType == 'form'"
					:viewData="item"
				></formView>
			</template>
	</div>
</template>

<script>
	import mobileView from '../mobileView.js'

	export default {
		name: "panelView",
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
	.plugin{
		position: relative;
		display: inline-block;
	}
</style>