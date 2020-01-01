<template>
	<div class="panel plugin" :class="viewData.base.type" :data-id="viewData.pluginId" :style="parseNormalStyle()">
		<template v-for="item in viewData.pluginList">
			<panelView
				v-if="item.pluginType == 'panel'"
				:viewData="item"
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
		<Icon size="12" class="drop-icon" type="md-move" />
		<Icon size="12" class="resize-icon" type="md-resize" />
	</div>
</template>

<script>
	import styleView from '../styleView.js'

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
		methods: styleView
	}
</script>

<style scoped>
.plugin.panel{
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
}
</style>