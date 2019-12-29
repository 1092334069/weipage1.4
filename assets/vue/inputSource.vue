<template>
	<div>
		<Form :label-width="80">
			<FormItem :label="name">
				<Select v-if="type === 'select'" v-model="formData.data" style="width:160px">
					<Option v-for="option in inputOptions" :value="formData.data" :key="option.value">{{option.label}}</Option>
				</Select>
				<Input v-else v-model="formData.data"></Input>
			</FormItem>
			<FormItem label="">
				<Select v-model="formData.source" style="width:160px">
					<Option v-for="option in sourceOptions" :value="formData.source" :key="option.value">{{option.label}}</Option>
				</Select>
			</FormItem>
		</Form>
	</div>
</template>

<script>
	export default {
		name: "inputSource",
		props: {
			formData: {
				type: Object,
				default: function() {
					return {}
				}
			},
			name: {
				type: String,
				default: ''
			},
			type: {
				type: String,
				default: 'text'
			},
			inputOptions: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data () {
		    return {
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
		}
	}
</script>
