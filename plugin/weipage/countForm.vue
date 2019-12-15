<template>
	<div>
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
				selectIndex: 0,
				ruleOptions: [{
					label: '自增',
					value: 'add'
				},{
					label: '自减',
					value: 'reduce'
				}]
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
		margin-top:10px;
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
