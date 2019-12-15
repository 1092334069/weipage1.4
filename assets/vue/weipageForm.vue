<template>
	<div>
		<Tabs type="card" value="base">
			<TabPane label="微页面" name="base">
				<weipage-base-form
					:form-data="weipage"
					@open-interface-model="openInterfaceModel"
					@select-image="selectImage">
				</weipage-base-form>
			</TabPane>
			<TabPane label="滚动条" name="scroll">
				<weipage-scroll-form
					:form-data="weipage" 
					@open-plugin-tree-model="openPluginTreeModel"
					@open-interface-model="openInterfaceModel"
					@open-interface-tree-model="openInterfaceTreeModel">
				</weipage-scroll-form>
			</TabPane>
			<TabPane label="计数器" name="count">
				<weipage-count-form
					:form-data="weipage">
				</weipage-count-form>
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
			}
		}
	}
</script>

<style scoped>

</style>
