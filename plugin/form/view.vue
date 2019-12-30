<template>
	<div class="form plugin" :class="{current: selectPluginId === viewData.pluginId}" :data-id="viewData.pluginId">
		<select v-if="viewData.base.type === 'select'" :style="parseNormalStyle()">
			<option v-for="item in viewData.base.optionList">{{item.label}}</option>
		</select>
		<input v-else :style="parseNormalStyle()" :value="viewData.base.data" />
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
	.form{
		display:inline-block;
		max-width:100%;
		margin-bottom:2px;
		position:relative;
	}
	.form input{
		border:none;
		cursor:pointer;
	}
	.form select{
		border:none;
		cursor:pointer;
	}
</style>