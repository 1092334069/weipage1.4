<template>
	<div>
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
		<action-form :formData="formData" :action-key-list="actionKeyList" @selectActionValue="selectActionValue" @selectImage="selectImage"></action-form>
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
				optionSelectIndex: 0,
				actionKeyList: [{
					label: '数据',
					value: 'data',
					type: 'text'
				},{
					label: '样式 宽度',
					value: 'width',
					type: 'number'
				},{
					label: '样式 高度',
					value: 'height',
					type: 'number'
				},{
					label: '样式 字体大小',
					value: 'fontSize',
					type: 'number'
				},{
					label: '样式 文字颜色',
					value: 'color',
					type: 'color'
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
		margin-top: 10px;
		cursor: pointer;
	}
	.delete-btn{
		cursor:pointer;
		position:absolute;
		right:10px;
		top:10px;
		z-index:10;
	}
</style>