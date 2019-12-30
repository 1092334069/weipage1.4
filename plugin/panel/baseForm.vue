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
		<actionForm :formData="formData" @selectActionValue="selectActionValue" @selectImage="selectImage"></actionForm>
		<hr/>
		<Form :label-width="80">
			<FormItem label="属性">
				<div class="form-item" :class="parseClass(index)" v-for="(item,index) in formData.attrList" @click="selectAttr(index)">{{item.key}}</div>
				<Icon class="add-btn" type="ios-add-circle-outline" size="24" @click="addAttr" />
			</FormItem>
		</Form>
		<div class="form-panel" v-if="attrList && attrList.length">
			<Form v-for="(item,index) in attrList" v-if="attrSelectIndex === index" :key="index" :label-width="80">
				<Icon class="delete-btn" type="ios-close-circle-outline" size="24" @click="deleteAttr" />
				<FormItem label="属性键">
					<Input v-model="item.key" placeholder="请输入字母"></Input>
				</FormItem>
				<FormItem label="属性值">
					<div class="form-item" @click="selectAttrValue">{{item.name}}</div>
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
		    	attrSelectIndex: 0
			}
		},
		methods: {
			selectImage: function(res) {
				this.$emit('selectImage', res)
			},
			selectActionValue: function(res) {
				this.$emit('openInterfaceTreeModel', res)
			},
			parseClass: function(index) {
				if (index === this.attrSelectIndex) {
					return 'current'
				} else {
					return ''
				}
			},
			selectAttrValue: function() {
				this.$emit('openInterfaceTreeModel', {
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