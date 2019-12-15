<template>
	<div>
		<Tabs type="card" value="base">
			<TabPane label="基础" name="base">
				<panel-base-form
					v-if="editForm.pluginType == 'panel'"
					:form-data="editForm.base"
					@open-interface-tree-model="openInterfaceTreeModel"
					@action-image="selectImage">
				</panel-base-form>
				<text-base-form
					v-else-if="editForm.pluginType == 'text'"
					:form-data="editForm.base"
					@open-interface-tree-model="openInterfaceTreeModel">
				</text-base-form>
				<image-base-form
					v-else-if="editForm.pluginType == 'image'"
					:form-data="editForm.base"
					@open-interface-tree-model="openInterfaceTreeModel"
					@select-image="selectImage">
				</image-base-form>
				<form-base-form
					v-else-if="editForm.pluginType == 'form'"
					:form-data="editForm.base"
					@open-interface-tree-model="openInterfaceTreeModel">
				</form-base-form>
			</TabPane>
			<TabPane label="样式" name="style">
				<style-form
					:form-data="editForm.style"
					@open-style-model="openStyleModel"
					@select-image="selectImage">
				</style-form>
			</TabPane>
			<TabPane label="事件" name="event">
				<panel-event-form
					v-if="editForm.pluginType == 'panel'"
					:form-data="editForm.event"
					:base-data="editForm.base"
					:weipage-data="weipage"
					@open-interface-model="openInterfaceModel"
					@open-plugin-tree-model="openPluginTreeModel"
					@open-interface-tree-model="openInterfaceTreeModel"
					@open-form-tree-model="openFormTreeModel">
				</panel-event-form>
			</TabPane>
		</Tabs>
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
			}
		},
		data () {
			return {}
		},
		methods: {
			selectImage: function() {
				this.$emit('select-image')
			},
			openInterfaceTreeModel: function() {
				this.$emit('open-interface-model')
			},
			openInterfaceModel: function() {
				this.$emit('open-interface-model')
			},
			openPluginTreeModel: function() {
				this.$emit('open-plugin-tree-model')
			},
			openFormTreeModel: function() {
				this.$emit('open-form-tree-model')
			}
		}
	}
</script>

<style scoped>

</style>
