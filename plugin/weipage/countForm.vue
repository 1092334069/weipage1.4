<template>
	<div class="form">
		<Form :label-width="80">
			<FormItem label="计数器列表">
				<div class="form-item" :class="parseClass(index)" v-for="(item,index) in formData.countEvent.eventList" @click="selectEvent(index)">{{item.name}}</div>
				<Icon class="add-btn" type="ios-add-circle-outline" size="24" @click="addEvent" />
			</FormItem>
		</Form>
		<Form v-if="formData.countEvent.eventList && formData.countEvent.eventList.length" :label-width="80">
			<hr/>
			<template v-for="(item,index) in formData.countEvent.eventList" v-if="selectIndex === index">
				<Icon class="delete-btn" type="ios-close-circle-outline" size="24" @click="deleteOption(index)" />
				<FormItem label="名称">
					<Input v-model="item.name"></Input>
				</FormItem>
				<FormItem label="规则">
					<RadioGroup v-model="formData.rule">
						<Radio label="add">自增</Radio>
						<Radio label="reduce">自减</Radio>
					</RadioGroup>
				</FormItem>
			</template>
			<hr/>
		</Form>
	</div>
</template>

<script>
	import { getLocalUuid } from '../pluginAction.js'
	export default {
		name: "weipageCountForm",
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
				const eventList = this.formData.countEvent.eventList
				const uuid = getLocalUuid()
				eventList.push({
					countId: uuid,
					name: '计数器',
					rule: 'add',
					initial: 1,
					cardinal: 1
				})
				this.selectIndex = eventList.length - 1
			},
			deleteEvent: function(index) {
				const eventList = this.formData.countEvent.eventList
				eventList.splice(index, 1)
				this.selectIndex = 0
			}
		}
	}
</script>


<style scoped>

</style>
