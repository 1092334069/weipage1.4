<template>
	<div class="form plugin" :data-id="viewData.pluginId">
		<select v-if="viewData.base.type === 'select'" :style="parseNormalStyle()" class="form-input" :name="viewData.base.key">
			<option v-for="item in viewData.base.optionList">{{item.label}}</option>
		</select>
		<input v-else :style="parseNormalStyle()" :placeholder="viewData.base.data" class="form-input" :name="viewData.base.key" />
	</div>
</template>

<script>
	import mobileView from '../mobileView.js'

	export default {
		name: "formView",
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
	.form{
		display: inline-block;
		max-width: 100%;
		overflow: hidden;
	}
	.form input{
		border: none;
		cursor: pointer;
	}
	.form select{
		border: none;
		cursor: pointer;
	}
</style>