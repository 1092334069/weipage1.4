<template>
	<div class="form">
		<Form :label-width="80">
			<FormItem label="名称">
				<Input v-model="formData.name"></Input>
			</FormItem>
			<FormItem label="默认值">
				<Input v-model="formData.data"></Input>
			</FormItem>
		</Form>
		<action-form :formData="formData" @selectActionValue="selectActionValue" @selectImage="selectImage"></action-form>
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
			return {}
		},
		methods: {
			selectImage: function(res) {
				this.$emit('select-image', res)
			},
			selectActionValue: function(res) {
				this.$emit('openInterfaceTreeModel', res)
			}
		}
	}
</script>

<style>

</style>