<template>
	<div class="form">
		<Form :label-width="80">
			<FormItem label="名称">
				<Input v-model="formData.name"></Input>
			</FormItem>
			<FormItem label="图片">
				<image-upload lable="图片" :formData="formData" name="data" @selectImage="selectImage"></image-upload>
			</FormItem>
		</Form>
		<action-form :formData="formData" @selectActionValue="selectActionValue" @selectImage="selectImage"></action-form>
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
			return {}
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