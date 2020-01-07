<template>
	<div class="edit-form">
		<Tabs type="card" value="base">
			<TabPane label="微页面" name="base">
				<div class="panel">
					<weipageBaseForm
						:formData="weipage"
						@openInterfaceModel="openInterfaceModel"
						@selectImage="selectImage">
					</weipageBaseForm>
				</div>
			</TabPane>
			<TabPane label="滚动条" name="scroll">
				<div class="panel">
					<weipageScrollForm
						:formData="weipage" 
						@openPluginTreeModel="openPluginTreeModel"
						@openInterfaceModel="openInterfaceModel"
						@openInterfaceTreeModel="openInterfaceTreeModel">
					</weipageScrollForm>
				</div>
			</TabPane>
			<TabPane label="计数器" name="count">
				<div class="panel">
					<weipageCountForm
						:formData="weipage">
					</weipageCountForm>
				</div>
			</TabPane>
		</Tabs>
	</div>
</template>

<script>
	export default {
		name: "weipageForm",
		props: {
			weipage: {
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
			selectImage: function(option) {
				this.$emit('select-image', option)
			},
			openInterfaceTreeModel: function(option) {
				this.$emit('open-interface-model', option)
			},
			openInterfaceModel: function(option) {
				this.$emit('open-interface-model', option)
			},
			openPluginTreeModel: function(option) {
				this.$emit('open-plugin-tree-model', option)
			}
		}
	}
</script>

<style scoped>
.edit-form{
	position: relative;
}
.panel{
	min-height: 95vh;
}
</style>
