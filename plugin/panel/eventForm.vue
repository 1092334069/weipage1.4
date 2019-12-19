<template>
	<div>
		<Form :label-width="80">
			<FormItem label="事件列表">
				<div class="form-item" :class="parseClass(index)" v-for="(item,index) in formData.eventList" @click="selectEvent(index)">{{index+1}}</div>
				<Icon class="add-btn" type="ios-add-circle-outline" size="24" @click="addEvent" />
			</FormItem>
		</Form>
		<div v-if="formData.eventList && formData.eventList.length">
			<hr/>
			<template v-for="(item,index) in formData.eventList" v-if="selectIndex === index">
				<Icon class="delete-btn" type="ios-close-circle-outline" size="24" @click="deleteEvent" />
				<Form :label-width="80">
					<FormItem label="响应条件">
						<RadioGroup v-model="item.type" @on-change="eventTypeChange">
							<Radio label="interface">接口事件</Radio>
							<Radio label="link">跳转链接</Radio>
							<Radio label="normal">本地事件</Radio>
						</RadioGroup>
					</FormItem>
				</Form>
				<Form v-if="item.type === 'link'">
					<FormItem label="链接地址">
						<Input v-model="item.value"></Input>
					</FormItem>
				</Form>
				<Form v-if="item.type === 'normal'">
					<FormItem label="元件">
						<div class="form-item" @click="openPluginTreeModel(item)">{{item.value.name}}</div>
					</FormItem>
					<FormItem v-if="item.value.options && item.value.options.length" label="响应">
						<Select v-model="item.value.actionIndex">
							<Option v-for="option in item.value.options" :value="option.value" :key="option.value">{{option.label}}</Option>
						</Select>
					</FormItem>
				</Form>
				<template v-if="item.type === 'interface'">
					<Form :label-width="80">
						<FormItem label="接口">
							<div class="form-item" @click="openInterfaceModel(item)">{{item.value.name}}</div>
						</FormItem>
					</Form>
					<template v-if="item.value.param && item.value.param.length">
						<div v-for="inf in item.value.param">
							<input-source v-if="inf.value.source === 'attr'" :lable="inf.name" :value="inf.value" :name="inf.key" :sourceOptions="sourceOptions" type="select" :inputOptions="attrOptions" @formChange="interfaceChange" @sourceChange="interfaceSourceChange"></input-source>
							<input-source v-else-if="inf.value.source === 'count'" :lable="inf.name" :value="inf.value" :name="inf.key" :sourceOptions="sourceOptions" type="select" :inputOptions="countOptions" @formChange="interfaceChange" @sourceChange="interfaceSourceChange"></input-source>
							<input-source v-else :lable="inf.name" :value="inf.value" :name="inf.key" :sourceOptions="sourceOptions" @formChange="interfaceChange" @sourceChange="interfaceSourceChange"></input-source>
						</div>
					</template>
				</template>
				<Form v-else :label-width="80">
					<FormItem label="触发状态">
						<RadioGroup v-model="item.status.attr">
							<Radio label="immediately">立即触发</Radio>
							<Radio label="condition">条件触发</Radio>
						</RadioGroup>
					</FormItem>
					<template v-if="item.status.attr === 'condition'">
						<FormItem label="触发类型">
							<RadioGroup v-model="item.status.type">
								<Radio label="interface">接口</Radio>
								<Radio label="url">链接参数</Radio>
								<Radio label="sessionStorage">缓存</Radio>
							</RadioGroup>
						</FormItem>
						<FormItem v-if="item.status.type === 'interface'" label="触发键">
							<div class="form-item" @click="openInterfaceTreeModel(item.status)">{{item.status.key.name}}</div>
						</FormItem>
						<FormItem v-else label="触发键">
							<Input v-model="item.status.key"></Input>
						</FormItem>
						<FormItem label="触发值">
							<Input v-model="item.status.value"></Input>
						</FormItem>
					</template>
				</Form>
			</template>
			<hr/>
		</div>
	</div>
</template>

<script>
	export default {
		name: "panelEventForm",
		props: {
			formData: {
				type: Object,
				default: function() {
					return {}
				}
			},
			baseData: {
				type: Object,
				default: function() {
					return {}
				}
			},
			weipageData: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data () {
			return {
				selectIndex: 0,
				sourceOptions: [{
					label: '固定值',
					value: 'static'
				},{
					label: '链接参数',
					value: 'url'
				},{
					label: '缓存',
					value: 'sessionStorage'
				},{
					label: '属性',
					value: 'attr'
				},{
					label: '表单',
					value: 'form'
				},{
					label: '计数器',
					value: 'count'
				}]
		    }
		},
		methods: {
			formChange: function(res) {
				res['pname'] = 'event'
				this.$emit('form-change', res)
			},
			parseClass: function(index) {
				if (index === this.selectIndex) {
					return 'current'
				} else {
					return ''
				}
			},
			openInterfaceModel: function(formData) {
				this.$emit('open-interface-model', {
					formData,
					name: 'value'
				})
			},
			openPluginTreeModel: function(formData) {
				this.$emit('open-plugin-tree-model', {
					formData: formData,
					name: 'value'
				})
			},
			selectEvent: function(index) {
				this.selectIndex = index
			},
			addEvent: function() {
				const eventList = this.formData.eventList
				eventList.push({
					type: 'interface',
					key: '',
					value: {
						name: '点击选择接口'
					},
					status: {
						attr: 'immediately',
						type: 'interface',
						key: {
							name: '点击选择接口参数',
							url: '',
							keyList: []
						},
						value: ''
					}
				})
				this.selectIndex = eventList.length - 1
			},
			deleteEvent: function() {
				const eventList = this.formData.eventList
				eventList.splice(this.selectIndex, 1)
				this.selectIndex = 0
			},
			eventTypeChange: function(res) {
				if (res.value === 'interface') {
					this.formData.eventList[this.selectIndex]['value'] = {
						name: '点击选择接口'
					}
				} else if (res.value === 'normal') {
					this.formData.eventList[this.selectIndex]['value'] = {
						name: '点击选择元件',
						id: '',
						options: [],
						actionName: '',
						actionId: ''
					}
				} else {
					this.formData.eventList[this.selectIndex]['value'] = ''
				}
			},
			normalEventChange: function(res) {
				const v = this.formData.eventList[this.selectIndex]['value']
				let actionName = ''
				for (var i = 0; i < v.options.length; i++) {
					if (v.options.value === res.value) {
						actionName = v.options.label
					}
				}
				v['actionIndex'] = res.value
				v['actionName'] = actionName
			},
			interfaceChange: function(res) {
				const interfaceInfo = this.formData.eventList[this.selectIndex]['value']
				for (let i = 0; i < interfaceInfo.param.length; i++) {
					if (interfaceInfo.param[i].key === res.name) {
						interfaceInfo.param[i].value = res.value
					}
				}
			},
			interfaceSourceChange: function(res) {
				if (res.value.source === 'form') {
					this.$emit('open-form-tree-model', {
						source: 'event',
						key: res.name
					})
				}
				this.interfaceChange(res)
			},
			statusChange(res) {
				const status = this.formData.eventList[this.selectIndex]['status']
				status[res.name] = res.value
			},
			statusTypeChange(res) {
				if (res.value === 'interface') {
					this.statusChange({
						name: 'key',
						value: {
							name: '点击选择接口参数',
							url: '',
							keyList: []
						}
					})
				} else {
					this.statusChange({
						name: 'key',
						value: ''
					})
				}
				this.statusChange(res)
			},
			openInterfaceTreeModel: function(formData) {
				this.$emit('open-interface-tree-model', {
					formData: formData,
					name: 'key'
				})
			}
		},
		computed: {
			attrOptions() {
				const options = []
				for (let i = 0; i < this.baseData.attrList.length; i++) {
					options.push({
						label: this.baseData.attrList[i].name,
						value: this.baseData.attrList[i].key
					})
				}
				return options
			},
			countOptions() {
				const options = []
				for (let i = 0; i < this.weipageData.countEvent.eventList.length; i++) {
					options.push({
						label: this.weipageData.countEvent.eventList[i].name,
						value: this.weipageData.countEvent.eventList[i].countId
					})
				}
				return options
			}
		}
	}
</script>

<style scoped>
	.form-item{
		padding:0 10px;
		margin-right:10px;
		border-radius:4px;
		height:40px;
		line-height:40px;
		background-color:#fff;
		display:inline-block;
		border:1px solid #fff;
		float:left;
		cursor:pointer;
	}
	.form-item.current{
		border:1px solid #138ed4;
	}
	.add-btn{
		margin-top:5px;
		cursor:pointer;
	}
	.delete-btn{
		cursor:pointer;
		position:absolute;
		right:10px;
		top:10px;
		z-index:10;
	}
</style>