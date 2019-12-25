<template>
	<div>
		<div class="form">
			<Form :label-width="80">
				<FormItem label="响应">
					<div class="form-item" :class="parseClass(index)" v-for="(item,index) in formData.actionList" @click="selectAction(index)">{{item.name}}</div>
					<Icon class="add-btn" type="ios-add-circle-outline" size="24" @click="addAction" />
				</FormItem>
			</Form>
		</div>
		<div v-if="formData.actionList && formData.actionList.length" class="form">
			<hr/>
			<Form v-for="(item,index) in formData.actionList" v-if="selectIndex === index" :key="index" :label-width="80">
				<Icon class="delete-btn" type="ios-close-circle-outline" size="24" @click="deleteAction" />
				<FormItem label="响应名">
					<Input v-model="item.name"></Input>
				</FormItem>
				<FormItem label="响应键">
					<Select v-model="item.key">
						<Option v-for="option in actionKeyList" :value="option.value" :key="option.value">{{option.label}}</Option>
					</Select>
				</FormItem>
				<FormItem label="响应条件">
					<RadioGroup v-model="item.condition">
						<Radio label="loading">加载触发</Radio>
						<Radio label="event">事件触发</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="响应类型">
					<RadioGroup v-model="item.type">
						<Radio label="interface">接口</Radio>
						<Radio label="static">固定值</Radio>
						<Radio label="url">链接参数</Radio>
						<Radio label="sessionStorage">缓存</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem v-if="item.type === 'static'" label="响应值">
					<image-upload v-if="key === 'image'" lable="背景图片" :formData="item" :name="value" @formChange="formChange"></image-upload>
					<ColorPicker v-if="actionKeyType === 'color'" v-model="item.value" alpha />
					<Input v-else v-model="item.value"></Input>
				</FormItem>
				<FormItem v-else-if="item.type === 'interface'" label="响应值">
					<div class="item-btn" @click="selectActionValue(item)">{{item.value.name}}</div>
				</FormItem>
				<FormItem v-else label="响应值">
					<Input v-model="item.value"></Input>
				</FormItem>
			</Form>
			<hr/>
		</div>
	</div>
</template>

<script>
	import { getLocalUuid } from '../pluginAction.js'

	export default {
		name: "actionForm",
		props: {
			formData: {
				type: Object,
				default: function() {
					return {}
				}
			},
			actionKeyList: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data () {
		    return {
		    	selectIndex: 0,
				actionTypeList: [{
					label: '接口',
					value: 'interface'
				},{
					label: '固定值',
					value: 'static'
				},{
					label: '链接参数',
					value: 'url'
				},{
					label: '缓存',
					value: 'sessionStorage'
				}],
				actionConditionList: [{
					label: '加载触发',
					value: 'loading'
				},{
					label: '事件触发',
					value: 'event'
				}]
			}
		},
		computed: {
			actionValueOptions: function() {
				let r = []
				for (let i = 0; i < this.actionKeyList.length; i++) {
					if (this.actionKeyList[i].value === this.formData.actionList[this.selectIndex].key) {
						r = this.actionKeyList[i].options
					}
				}
				return r
			},
			actionKeyType: function() {
				let r = ''
				for (let i = 0; i < this.actionKeyList.length; i++) {
					if (this.actionKeyList[i].value === this.formData.actionList[this.selectIndex].key) {
						r = this.actionKeyList[i].type
					}
				}
				return r
			}
		},
		methods: {
			parseClass: function(index) {
				if (index === this.selectIndex) {
					return 'current'
				} else {
					return ''
				}
			},
			selectAction: function(index) {
				this.selectIndex = index
			},
			actionTypeChange: function(val) {
				if (val === 'interface') {
					this.formData.actionList[this.selectIndex]['value'] = {
						name: '点击选择接口参数',
						url: '',
						keyList: []
					}
				} else {
					this.formData.actionList[this.selectIndex]['value'] = ''
				}
			},
			addAction: function() {
				const actionList = this.formData.actionList
				const uuid = getLocalUuid()
				actionList.push({
					actionId: uuid,
					name: '响应',
					key: 'base.data',
					condition: 'loading',
					type: 'interface',
					value: {
						name: '点击选择接口参数',
						url: '',
						keyList: []
					}
				})
				this.selectIndex = actionList.length - 1
			},
			selectImage: function(res) {
				this.$emit('selectImage', res)
			},
			selectActionValue: function(formData) {
				this.$emit('selectActionValue', {
					formData: formData,
					name: 'value'
				})
			},
			deleteAction: function() {
				const actionList = this.formData.actionList
				actionList.splice(this.formData.selectIndex, 1)
				this.selectIndex = 0
			}
		}
	}
</script>

<style scoped>
	
</style>
