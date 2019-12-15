<template>
	<div>
		<Form :label-width="80">
			<FormItem label="名称">
				<Input v-model="formData.name"></Input>
			</FormItem>
			<FormItem label="描述">
				<Input v-model="formData.describes"></Input>
			</FormItem>
			<FormItem label="图片">
				<image-upload :formData="formData" name="cover" @selectImage="selectImage"></image-upload>
			</FormItem>
			<FormItem label="文件名">
				<Input v-model="formData.pageName" placeholder="请输入字母"></Input>
			</FormItem>
			<FormItem label="背景色">
				<ColorPicker v-model="formData.backgroundColor" alpha />
			</FormItem>
			<FormItem label="接口">
				<div class="form-item" :class="parseClass(index)" v-for="(item,index) in formData.interfaceList" @click="selectInterface(index)">{{item.name}}</div>
				<Icon class="add-btn" type="ios-add-circle-outline" size="24" @click="openInterfaceModel" />
			</FormItem>
		</Form>
		<Form v-if="formData.interfaceList && formData.interfaceList.length" :label-width="80">	
			<hr/>
			<template v-for="itf in formData.interfaceList" v-if="formData.selectInterfaceId === itf.interfaceId">
				<Icon class="delete-btn" type="ios-close-circle-outline" size="24" @click="deleteInterface" />
				<div v-for="item in itf.param">
					<input-source :lable="item.name" :value="item.value" :name="item.key" :sourceOptions="sourceOptions" @formChange="interfaceChange"></input-source>
				</div>
			</template>
			<hr/>
		</Form>
	</div>
</template>

<script>
	export default {
		name: "weipageBaseForm",
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
				sourceOptions: [{
					label: '固定值',
					value: 'static'
				},{
					label: '链接参数',
					value: 'url'
				},{
					label: '缓存',
					value: 'cookie'
				}]
			}
		},
		methods: {
			openInterfaceModel: function() {
				this.$emit('open-interface-model', {
					formData: this.formData,
					name: 'interfaceList',
					isArray: true
				})
			},
			selectImage: function(res) {
				this.$emit('select-image', res)
			},
			selectInterface: function(index) {
				this.selectIndex = index
			},
			interfaceChange: function(res) {
				const interfaceList = this.formData.interfaceList
				for (let i = 0; i < interfaceList.length; i++) {
					if (this.selectIndex === i) {
						for (let j = 0; j < interfaceList[i].param.length; j++) {
							if (interfaceList[i].param[j].key === res.name) {
								interfaceList[i].param[j].value = res.value
							}
						}
					}
				}
			},
			parseClass: function(index) {
				if (index === this.selectIndex) {
					return 'current'
				} else {
					return ''
				}
			},
			deleteInterface: function(index) {
				const interfaceList = this.formData.interfaceList
				interfaceList.splice(this.selectIndex, 1)
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