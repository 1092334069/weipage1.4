<template>
	<div>
		<ul class="tree-list">
			<li v-for="(item,index) in paramList">
				<div class="tree-item" :class="{current: index == showIndex}" @click="selectInterfaceParam(item,index)">{{item.name}}</div>
				<div class="tree-child" v-if="item.child && item.child.length">
					<Icon v-if="index != showIndex" class="tree-child-more" type="ios-arrow-forward" size="24" @click="showChildTree(index)" />
					<interface-child-tree v-else :param-list="item.child" @select-interface-param="selectInterfaceParam"></interface-child-tree>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "interfaceChildTree",
		props: {
			paramList: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data () {
		    return {
		    	showIndex: 0
		    }
		},
		methods: {
			showChildTree: function(index) {
				this.showIndex = index
			},
			selectInterfaceParam: function(option, index) {
				if (typeof index !== 'undefined') {
					this.showIndex = index
				}
				let keyList = []
				if (option.keyList) {
					keyList = option.keyList
				}
				keyList.push(this.paramList[this.showIndex].key)
				const r = {
					keyList,
					name: option.name
				}
				this.$emit('select-interface-param', r)
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