<template>
	<div>
		<ul class="tree-list">
			<li v-for="item in pluginList">
				<div class="tree-item" :class="{current: item.pluginId == selectPluginId}" @click="pluginTreeSelect(item.pluginId)">{{item.base.name}}</div>
				<div class="tree-child" v-if="item.pluginList && item.pluginList.length">
					<Icon v-if="item.pluginId != showPluginId" class="tree-child-more" type="ios-arrow-forward" size="24" @click="showChildTree(item.pluginId)" />
					<plugin-tree v-if="showPluginId == item.pluginId" :plugin-list="item.pluginList" :select-plugin-id="selectPluginId" @plugin-tree-select="pluginTreeSelect"></plugin-tree>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "pluginTree",
		props: {
			pluginList: {
				type: Array,
				default: function() {
					return []
				}
			},
			selectPluginId: {
				type: String,
				default: ''
			}
		},
		data () {
		    return {
		    	showPluginId: ''
		    }
		},
		methods: {
			showChildTree: function(pluginId) {
				this.showPluginId = pluginId
			},
			pluginTreeSelect: function(pluginId) {
				this.$emit('plugin-tree-select', pluginId)
			}
		}
	}
</script>

<style scoped>
.tree-list{
	position:relative;
}
.tree-child .tree-list:before{
	content:"";
	width:0;
	height:0;
	border-top:10px solid transparent;
	border-bottom:10px solid transparent;
	border-right:20px solid #f0f0f0;
	position:absolute;
	top:10px;
	left:-20px;
}
.tree-list li{
	position:relative;
	padding-bottom:5px;
}
.tree-item{
	padding:10px;
	height:40px;
	line-height:20px;
	width:120px;
	display:inline-block;
	background-color:#f0f0f0;
	cursor:pointer;
	position:relative;
}
.tree-item.current{
	box-shadow:1px 1px 1px #138ed4;
	z-index:2;
}
.tree-child{
	position:absolute;
	left:120px;
	top:0;
	padding-left:40px;
	z-index:3;
}
.tree-child .tree-child-more{
	position:absolute;
	left:10px;
	top:10px;
	cursor:pointer;
}
</style>