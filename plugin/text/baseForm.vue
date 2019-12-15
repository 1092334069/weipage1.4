<template>
	<div>
		<Form :label-width="80">
			<FormItem label="名称">
				<Input v-model="formData.name"></Input>
			</FormItem>
			<FormItem label="默认值">
				<Input v-model="formData.data"></Input>
			</FormItem>
		</Form>
		<action-form :formData="formData" :action-key-list="actionKeyList" @selectActionValue="selectActionValue" @selectImage="selectImage"></action-form>
	</div>
</template>

<script>
	export default {
		name: "textBaseForm",
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
				actionKeyList:[{
					label: '值',
					value: 'base.data',
					type: 'text'
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
	.form{
		position:relative;
		margin:5px 0;
	}
</style>