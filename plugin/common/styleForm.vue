<template>
	<div class="form">
		<Form ref="styleForm" :label-width="80">
			<FormItem v-for="(val, key, index) in formData" :label="getFormLabel(key)">
				<ColorPicker v-if="key === 'color' || key === 'backgroundColor'" v-model="formData[key]" alpha />
				<Input v-else v-model="formData[key]"></Input>
			</FormItem>
		</Form>
		<div class="more-style" @click="openStyleModel">
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
			},
			openStyleModel: function() {
				this.$emit('open-style-model')
			}
		}
	}
</script>

<style scoped>
	.form{
		padding: 20px 40px 0 0;
	}
	.more-style{
		cursor: pointer;
		margin: 0 78px 20px;
		display: inline-block;
	}
</style>