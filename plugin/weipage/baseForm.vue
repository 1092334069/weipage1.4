<template>
	<div class="form">
		<Form :label-width="100">
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
		<div v-if="selectIndex == index" v-for="(itf,index) in formData.interfaceList" class="form-panel">	
			<hr/>
			<Icon class="delete-btn" type="ios-close-circle-outline" size="24" @click="deleteInterface" />
			<div v-for="item in itf.param">
				<inputSource
					:formData="item.value"
					:name="item.name"
				></inputSource>
			</div>
			<hr/>
		</div>
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
		    	selectIndex: 0
			}
		},
		methods: {
			openInterfaceModel: function() {
				this.$emit('openInterfaceModel', {
					formData: this.formData,
					name: 'interfaceList',
					isArray: true
				})
			},
			selectImage: function(res) {
				this.$emit('selectImage', res)
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

</style>