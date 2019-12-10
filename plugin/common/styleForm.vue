<template>
	<div>
		<div v-for="(val, key, index) in formData" class="form">
			<v-color v-if="getFormForm(key) === 'color'" :lable="getFormLabel(key)" :formData="formData" :name="key"></v-color>
			<v-image v-else-if="getFormForm(key) === 'image'" :lable="getFormLabel(key)" :formData="formData" :name="key" @selectImage="selectImage"></v-image>
			<v-text v-else :lable="getFormLabel(key)" :formData="formData" :name="key"></v-text>
		</div>
		<div class="more-style">
			<Icon type="ios-add-circle-outline" size="24" />
			<span>更多样式</span>
		</div>
	</div>
</template>

<script>
	import styleConfig from '../styleConfig.js'

	export default {
		name: "styleForm",
		props: {
			formData: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data () {
			return {}
		},
		methods: {
			selectImage: function(res) {
				this.$emit('select-image', res)
			},
			getFormLabel: function(key) {
				if (styleConfig[key]) {
					return styleConfig[key].label
				}
				return ''
			},
			getFormForm: function(key) {
				if (styleConfig[key]) {
					return styleConfig[key].form
				}
				return 'text'
			}
		}
	}
</script>

<style scoped>
	.more-style{
		cursor: pointer;
		margin: 10px 86px;
		display: inline-block;
	}
</style>