<template>
	<div class="tree">
		<ul class="tree-list">
			<li v-for="(item,index) in interfaceList">
				<div class="tree-item">{{item.name}}</div>
				<div class="tree-child" v-if="item.callbackParam && item.callbackParam.length">
					<Icon v-if="index != showIndex" class="tree-child-more" type="ios-arrow-forward" size="24" @click="showChildTree(index)" />
					<interface-child-tree v-else :param-list="item.callbackParam" @select-interface-param="selectInterfaceParam"></interface-child-tree>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "interfaceTree",
		props: {
			interfaceList: {
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
			selectInterfaceParam: function(option) {
				option['url'] = this.interfaceList[this.showIndex].url
				this.$emit('select-interface-param', option)
			}
		}
	}
</script>

<style scoped>
.tree{
	min-height:360px;
}
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