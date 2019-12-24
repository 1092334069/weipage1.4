<template>
	<div class="form">
		<Form :label-width="80">
			<FormItem label="名称">
				<Input v-model="formData.name"></Input>
			</FormItem>
			<FormItem label="类型">
				<RadioGroup v-model="formData.type">
					<Radio label="normal">普通</Radio>
					<Radio label="list">列表</Radio>
					<Radio label="swiper">轮播</Radio>
				</RadioGroup>
			</FormItem>
		</Form>
		<action-form :formData="formData" :action-key-list="actionKeyList" @selectActionValue="selectActionValue" @selectImage="selectImage"></action-form>
		<Form :label-width="80">
			<FormItem label="属性">
				<div class="form-item" :class="parseClass(index)" v-for="(item,index) in formData.attrList" @click="selectAttr(index)">{{item.key}}</div>
				<Icon class="add-btn" type="ios-add-circle-outline" size="24" @click="addAttr" />
			</FormItem>
		</Form>
		<div class="form-panel" v-if="attrList && attrList.length">
			<hr/>
			<Form v-for="(item,index) in attrList" v-if="attrSelectIndex === index" :key="index" :label-width="80">
				<Icon class="delete-btn" type="ios-close-circle-outline" size="24" @click="deleteAttr" />
				<FormItem label="属性键">
					<Input v-model="item.key" placeholder="请输入字母"></Input>
				</FormItem>
				<FormItem label="属性值">
					<div class="perch-btn" @click="selectAttrValue">{{item.name}}</div>
				</FormItem>
			</Form>
			<hr/>
		</div>
	</div>
</template>

<script>
	import { getLocalUuid } from '../pluginAction.js'

	export default {
		name: "panelBaseForm",
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
		    	attrSelectIndex: 0,
				actionKeyList: [{
					label: '数据',
					value: 'base.data',
					type: 'text'
				},{
					label: '样式 宽度',
					value: 'style.width',
					type: 'number'
				},{
					label: '样式 高度',
					value: 'style.height',
					type: 'number'
				},{
					label: '样式 外边距',
					value: 'style.margin',
					type: 'fourSides'
				},{
					label: '样式 内边距',
					value: 'style.padding',
					type: 'fourSides'
				},{
					label: '样式 圆角',
					value: 'style.borderRadius',
					type: 'fourSides'
				},{
					label: '样式 旋转',
					value: 'style.transformRotate',
					type: 'number'
				},{
					label: '样式 状态',
					value: 'style.display',
					type: 'select',
					options: [{
						label: '显示',
						value: 'block'
					},{
						label: '隐藏',
						value: 'none'
					}]
				},{
					label: '样式 边框',
					value: 'style.border',
					type: 'text'
				},{
					label: '样式 定位',
					value: 'style.position',
					type: 'text'
				},{
					label: '样式 背景颜色',
					value: 'style.backgroundColor',
					type: 'color'
				},{
					label: '样式 图片',
					value: 'style.backgroundImage',
					type: 'image'
				},{
					label: '样式 字体对齐',
					value: 'style.textAlign',
					type: 'select',
					options: [{
						label: '左',
						value: 'left'
					},{
						label: '右',
						value: 'right'
					},{
						label: '中',
						value: 'center'
					}]
				},{
					label: '样式 字体大小',
					value: 'style.fontSize',
					type: 'number'
				},{
					label: '样式 字体颜色',
					value: 'style.color',
					type: 'color'
				},{
					label: '样式 字体行高',
					value: 'style.lineHeight',
					type: 'number'
				},{
					label: '样式 字体宽度',
					value: 'style.fontWeight',
					type: 'number'
				}]
			}
		},
		methods: {
			selectImage: function(res) {
				this.$emit('select-image', res)
			},
			selectActionValue: function(res) {
				this.$emit('open-interface-tree-model', res)
			},
			parseClass: function(index) {
				if (index === this.attrSelectIndex) {
					return 'current'
				} else {
					return ''
				}
			},
			selectAttrValue: function() {
				this.$emit('open-interface-tree-model', {
					formData: this.attrList,
					name: this.attrSelectIndex
				})
			},
			selectAttr: function(index) {
				this.attrSelectIndex = index
			},
			addAttr: function() {
				const uuid = getLocalUuid()
				this.attrList.push({
					attrId: uuid,
					key: '',
					name: '请选择属性',
					url: '',
					keyList: []
				})
				this.attrSelectIndex = this.attrList.length - 1
			},
			deleteAttr: function() {
				this.attrList.splice(this.attrSelectIndex, 1)
				this.attrSelectIndex = 0
			}
		},
		computed: {
			attrList: {
				get() {
					return this.formData.attrList
				}
			}
		}
	}
</script>

<style>

</style>