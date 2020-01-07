<template>
	<div class="edit-form">
		<Tabs type="card" value="base">
			<TabPane label="基础" name="base">
				<div class="panel">
					<panelBaseForm
						v-if="editForm.pluginType == 'panel'"
						:formData="editForm.base"
						@openInterfaceTreeModel="openInterfaceTreeModel"
						@actionImage="selectImage">
					</panelBaseForm>
					<textBaseForm
						v-else-if="editForm.pluginType == 'text'"
						:formData="editForm.base"
						@openInterfaceTreeModel="openInterfaceTreeModel">
					</textBaseForm>
					<imageBaseForm
						v-else-if="editForm.pluginType == 'image'"
						:formData="editForm.base"
						@openInterfaceTreeModel="openInterfaceTreeModel"
						@selectImage="selectImage">
					</imageBaseForm>
					<formBaseForm
						v-else-if="editForm.pluginType == 'form'"
						:formData="editForm.base"
						@openInterfaceTreeModel="openInterfaceTreeModel">
					</formBaseForm>
				</div>
			</TabPane>
			<TabPane label="样式" name="style">
				<div class="panel">
					<styleForm
						:formData="editForm"
						@openStyleModel="openStyleModel"
						@selectImage="selectImage">
					</styleForm>
				</div>
			</TabPane>
			<TabPane label="事件" name="event">
				<div class="panel">
					<panelEventForm
						v-if="editForm.pluginType == 'panel'"
						:formData="editForm.event"
						:baseData="editForm.base"
						:weipageData="weipage"
						@openInterfaceModel="openInterfaceModel"
						@open-plugin-tree-model="openPluginTreeModel"
						@openPluginTreeModel="openInterfaceTreeModel"
						@openFormTreeModel="openFormTreeModel">
					</panelEventForm>
				</div>
			</TabPane>
		</Tabs>
		<Icon class="delete-btn" type="ios-close-circle-outline" size="24" @click="removePlugin" />
	</div>
</template>

<script>
	export default {
		name: "editForm",
		props: {
			editForm: {
				type: Object,
				default: function() {
					return {}
				}
			},
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
			removePlugin: function(option) {
				this.$emit('remove-plugin', option)
			},
			selectImage: function(option) {
				this.$emit('select-image', option)
			},
			openStyleModel: function(option) {
				this.$emit('open-style-model', option)
			},
			openInterfaceModel: function(option) {
				this.$emit('open-interface-model', option)
			},
			openInterfaceTreeModel: function(option) {
				this.$emit('open-interface-tree-model', option)
			},
			openPluginTreeModel: function(option) {
				this.$emit('open-plugin-tree-model', option)
			},
			openFormTreeModel: function(option) {
				this.$emit('open-form-tree-model', option)
			}
		}
	}
</script>

<style scoped>
.edit-form{
	position: relative;
}
.delete-btn{
	position: absolute;
	right: 10px;
	top: 4px;
	cursor: pointer;
}
.panel{
	min-height: 95vh;
}
</style>
