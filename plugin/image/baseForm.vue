<template>
	<div>
		<Form :label-width="80">
			<FormItem label="名称">
				<Input v-model="formData.name"></Input>
			</FormItem>
			<FormItem label="图片">
				<image-upload lable="图片" :formData="formData" name="data" @selectImage="selectImage"></image-upload>
			</FormItem>
		</Form>
		<action-form :formData="formData" :action-key-list="actionKeyList" @selectActionValue="selectActionValue" @selectImage="selectImage"></action-form>
	</div>
</template>

<script>
	export default {
		name: "imageBaseForm",
		props: {
			formData: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data () {
			return {
				actionKeyList: [{
					label: '图片',
					value: 'base.data',
					type: 'image'
				},{
					label: '宽度',
					value: 'style.width',
					type: 'number'
				}]
			}
		},
		methods: {
			selectImage: function(res) {
				this.$emit('select-image', res)
			},
			selectActionValue: function(res) {
				this.$emit('open-interface-tree-model', res)
			}
		}
	}
</script>

<style>
	
</style>