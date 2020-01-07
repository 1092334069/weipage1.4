<template>
	<div class="form">
		<Form :label-width="100">
			<FormItem label="事件列表">
				<div class="form-item" :class="parseClass(index)" v-for="(item,index) in formData.scrollEvent.eventList" @click="selectEvent(index)">{{index+1}}</div>
				<Icon class="add-btn" type="ios-add-circle-outline" size="24" @click="addEvent" />
			</FormItem>
		</Form>
		<div v-if="formData.scrollEvent.eventList && formData.scrollEvent.eventList.length">
			<hr/>
			<div v-for="(item,index) in formData.scrollEvent.eventList" v-if="formData.scrollEvent.selectIndex === index">
				<Icon class="delete-btn" type="ios-close-circle-outline" size="24" @click="deleteEvent" />
				<Form :label-width="100">
					<FormItem label="方向">
						<RadioGroup v-model="item.direction">
							<Radio label="bottom">向下</Radio>
							<Radio label="top">向上</Radio>
						</RadioGroup>
					</FormItem>
					<FormItem label="类型">
						<RadioGroup v-model="item.type" @on-change="eventTypeChange">
							<Radio label="interface">接口事件</Radio>
							<Radio label="normal">本地事件</Radio>
						</RadioGroup>
					</FormItem>
				</Form>
				<Form v-if="item.type === 'normal'" :label-width="100">
					<FormItem label="元件">
						<div class="form-item" @click="openPluginTreeModel(item)">{{item.value.name}}</div>
					</FormItem>
					<FormItem v-if="item.value.options && item.value.options.length" label="响应">
						<Select v-model="item.value">
							<Option v-for="option in item.value.options" :value="option.value.actionIndex" :key="option.value">{{option.label}}</Option>
						</Select>
					</FormItem>
				</Form>
				<template v-else>
					<Form :label-width="100">
						<FormItem label="接口">
							<div class="form-item" @click="openInterfaceModel(item)">{{item.value.name}}</div>
						</FormItem>
					</Form>
					<template v-if="item.value.param && item.value.param.length">
						<div v-for="inf in item.value.param">
							<input-source
								v-if="inf.value.source === 'count'"
								:lable="inf.name"
								:value="inf.value"
								:name="inf.key"
								type="select"
								:inputOptions="countOptions"
							></input-source>
							<input-source
								v-else
								:lable="inf.name"
								:value="inf.value"
								:name="inf.key"
							></input-source>
						</div>
					</template>
					<Form :label-width="100">
						<FormItem label="累加参数">
							<div class="form-item" @click="openInteraceTreeModel(item)">{{item.keyword.name}}</div>
						</FormItem>
					</Form>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "weipageScrollForm",
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
			selectEvent: function(index) {
				this.selectIndex = index
			},
			addEvent: function() {
				const eventList = this.formData.scrollEvent.eventList
				eventList.push({
					type: 'interface',
					direction: 'bottom',
					key: '',
					value: {
						name: '点击选择接口'
					},
					keyword: {
						name: '点击选择接口参数',
						url: '',
						keyList: []
					}
				})
				this.selectIndex = eventList.length - 1
			},
			deleteEvent: function(index) {
				const eventList = this.formData.scrollEvent.eventList
				eventList.splice(index, 1)
			},
			eventTypeChange: function(res) {
				if (res.value === 'interface') {
					this.formData.scrollEvent.eventList[this.selectIndex]['value'] = {
						name: '点击选择接口'
					}
				} else if (res.value === 'normal') {
					this.formData.scrollEvent.eventList[this.selectIndex]['value'] = {
						name: '点击选择元件',
						id: '',
						options: [],
						actionName: '',
						actionId: ''
					}
				} else {
					this.formData.scrollEvent.eventList[this.selectIndex]['value'] = ''
				}
			},
			openPluginTreeModel: function(formData) {
				this.$emit('openPluginTreeModel', {
					formData: formData,
					name: 'value'
				})
			},
			openInterfaceModel: function(formData) {
				this.$emit('openInterfaceModel', {
					formData: formData,
					name: 'value'
				})
			},
			openInteraceTreeModel: function(formData) {
				this.$emit('openInterfaceTreeModel', {
					formData: formData,
					name: 'keyword'
				})
			}
		},
		computed: {
			countOptions() {
				const options = []
				for (let i = 0; i < this.formData.countEvent.eventList.length; i++) {
					options.push({
						label: this.formData.countEvent.eventList[i].name,
						value: this.formData.countEvent.eventList[i].countId
					})
				}
				return options
			}
		}
	}
</script>

<style scoped>

</style>
