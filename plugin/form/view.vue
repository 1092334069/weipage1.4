<template>
	<div class="form plugin" :data-id="viewData.pluginId">
		<select v-if="viewData.base.type === 'select'" :style="parseNormalStyle()">
			<option v-for="item in viewData.base.optionList">{{item.label}}</option>
		</select>
		<input v-else :style="parseNormalStyle()" :placeholder="viewData.base.data" />
		<Icon size="12" class="drop-icon" type="md-move" />
		<Icon size="12" class="resize-icon" type="md-resize" />
	</div>
</template>

<script>
	import styleView from '../styleView.js'

	export default {
		name: "formView",
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
	.form{
		display:inline-block;
		max-width:100%;
		position:relative;
	}
</style>