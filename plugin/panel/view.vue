<template>
	<div class="panel plugin" :class="{current: selectPluginId === viewData.pluginId}" :data-id="viewData.pluginId" :style="parseNormalStyle()">
		<template v-for="item in viewData.pluginList">
			<panel-view v-if="item.pluginType == 'panel'" :view-data="item" :select-plugin-id="selectPluginId"></panel-view>
			<text-view v-else-if="item.pluginType == 'text'" :view-data="item" :select-plugin-id="selectPluginId"></text-view>
			<image-view v-else-if="item.pluginType == 'image'" :view-data="item" :select-plugin-id="selectPluginId"></image-view>
			<form-view v-else-if="item.pluginType == 'form'" :view-data="item" :select-plugin-id="selectPluginId"></form-view>
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
.panel{
    background-repeat: no-repeat;
    background-position: center;
}
</style>