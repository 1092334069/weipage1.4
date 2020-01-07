<template>
	<div>
		<Form ref="styleForm" :label-width="100">
			<FormItem v-for="(val, key, index) in styleData" :label="getFormLabel(key)" :key="key">
				<image-upload v-if="key === 'backgroundImage'" lable="背景图片" :formData="styleData" :name="key" @selectImage="selectImage"></image-upload>
				<ColorPicker v-else-if="key === 'color' || key === 'backgroundColor'" v-model="styleData[key]" alpha />
				<Input v-else v-model="styleData[key]"></Input>
				<Icon class="delete-btn" type="ios-close-circle-outline" size="24" @click="deleteStyle(key)" />
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
				this.$emit('selectImage', res)
			},
			getFormLabel: function(key) {
				if (styleConfig[key]) {
					return styleConfig[key].label
				}
				return key
			},
			getFormForm: function(key) {
				if (styleConfig[key]) {
					return styleConfig[key].form
				}
				return 'text'
			},
			openStyleModel: function() {
				this.$emit('openStyleModel')
			},
			deleteStyle: function(k) {
				const style = {}
				for (let key in this.formData.style) {
					if (k !== key) {
						style[key] = this.formData.style[key]
					}
				}
				this.formData.style = style
			}
		},
		computed: {
			styleData: function(){
				return this.formData.style
			}
		}
	}
</script>

<style scoped>
.more-style{
	cursor: pointer;
	margin: 0 78px 20px;
	display: inline-block;
}
.delete-btn{
	position: absolute;
	right: 10px;
	top: 50%;
	transform: translate(0, -50%);
	cursor: pointer;
}
</style>