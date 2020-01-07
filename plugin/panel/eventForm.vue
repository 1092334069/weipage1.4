<template>
	<div class="form">
		<Form :label-width="100">
			<FormItem label="事件列表">
				<div class="form-item" :class="parseClass(index)" v-for="(item,index) in formData.eventList" @click="selectEvent(index)">{{index+1}}</div>
				<Icon class="add-btn" type="ios-add-circle-outline" size="24" @click="addEvent" />
			</FormItem>
		</Form>
		<div v-if="formData.eventList && formData.eventList.length" class="form-panel">
			<hr/>
			<template v-for="(item,index) in formData.eventList" v-if="selectIndex === index">
				<Icon class="delete-btn" type="ios-close-circle-outline" size="24" @click="deleteEvent" />
				<Form :label-width="100">
					<FormItem label="响应条件">
						<RadioGroup v-model="item.type" @on-change="eventTypeChange">
							<Radio label="interface">接口事件</Radio>
							<Radio label="link">跳转链接</Radio>
							<Radio label="normal">本地事件</Radio>
						</RadioGroup>
					</FormItem>
				</Form>
				<Form v-if="item.type === 'link'" :label-width="100">
					<FormItem label="链接地址">
						<Input v-model="item.value"></Input>
					</FormItem>
				</Form>
				<Form v-if="item.type === 'normal'" :label-width="100">
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
					<Form :label-width="100">
						<FormItem label="接口">
							<div class="form-item" @click="openInterfaceModel(item)">{{item.value.name}}</div>
						</FormItem>
					</Form>
					<template v-for="inf in item.value.param">
						<div v-if="item.value.param && item.value.param.length">
							<inputSource
								v-if="inf.value.source === 'attr'"
								:formData="inf.value"
								:name="inf.name"
								type="select"
								:inputOptions="attrOptions"
							></inputSource>
							<inputSource
								v-else-if="inf.value.source === 'count'"
								:formData="inf.value"
								:name="inf.name"
								type="select"
								:inputOptions="countOptions"
							></inputSource>
							<inputSource
								v-else
								:formData="inf.value"
								:name="inf.name"
							></inputSource>
						</div>
					</template>
				</template>
				<Form v-else :label-width="100">
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
				selectIndex: 0
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
			openInterfaceModel: function(formData) {
				this.$emit('openInterfaceModel', {
					formData,
					name: 'value'
				})
			},
			openPluginTreeModel: function(formData) {
				this.$emit('openPluginTreeModel', {
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
			openInterfaceTreeModel: function(formData) {
				this.$emit('openInterfaceTreeModel', {
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
	
</style>