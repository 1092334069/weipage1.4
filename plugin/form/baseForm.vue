<template>
	<div class="form">
		<Form :label-width="80">
			<FormItem label="名称">
				<Input v-model="formData.name"></Input>
			</FormItem>
			<FormItem label="默认值">
				<Input v-model="formData.data"></Input>
			</FormItem>
			<FormItem label="表单键">
				<Input v-model="formData.key" placeholder="请输入字母"></Input>
			</FormItem>
			<FormItem label="表单类型">
				<RadioGroup v-model="item.type">
					<Radio label="text">文本</Radio>
					<Radio label="number">数字</Radio>
					<Radio label="tel">电话</Radio>
					<Radio label="select">选项</Radio>
				</RadioGroup>
			</FormItem>
		</Form>
		<action-form :formData="formData" @selectActionValue="selectActionValue" @selectImage="selectImage"></action-form>
		<Form v-if="formData.type === 'select'" :label-width="80">
			<FormItem label="选项">
				<div class="form-item" :class="parseClass(index)" v-for="(item,index) in formData.optionList" @click="selectOption(index)">{{item.label}}</div>
				<Icon class="add-btn" type="ios-add-circle-outline" size="24" @click="addOption" />
			</FormItem>
			<div v-if="formData.optionList && formData.optionList.length">
				<hr/>
				<template v-for="(item,index) in formData.optionList" v-if="optionSelectIndex === index">
					<Icon class="delete-btn" type="ios-close-circle-outline" size="24" @click="deleteOption(index)" />
					<FormItem label="选项名">
						<Input v-model="item.label"></Input>
					</FormItem>
					<FormItem label="选项值">
						<Input v-model="item.value"></Input>
					</FormItem>
				</template>
				<hr/>
			</div>
		</Form>
	</div>
</template>

<script>
	export default {
		name: "formBaseForm",
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
				optionSelectIndex: 0
			}
		},
		methods: {
			selectImage: function(res) {
				this.$emit('select-image', res)
			},
			selectActionValue: function(res) {
				this.$emit('openInterfaceTreeModel', res)
			},
			parseClass: function(index) {
				if (index === this.optionSelectIndex) {
					return 'current'
				} else {
					return ''
				}
			},
			selectOption: function(index) {
				this.optionSelectIndex = index
			},
			addOption: function() {
				const optionList = this.formData.optionList
				optionList.push({
					label: '',
					value: ''
				})
				this.optionSelectIndex = optionList.length - 1
			},
			deleteOption: function(index) {
				const optionList = this.formData.optionList
				optionList.splice(index, 1)
				this.optionSelectIndex = 0
			}
		}
	}
</script>

<style scoped>

</style>