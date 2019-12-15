<template>
	<div>
		<Form :label-width="80">
			<FormItem :label="lable">
				<Select v-if="type === 'select'" v-model="formData.name">
					<Option v-for="option in inputOptions" :value="option.value" :key="option.value">{{option.label}}</Option>
				</Select>
				<Input v-else v-model="formData.name"></Input>
			</FormItem>
			<FormItem label="">
				<Select v-model="inputForm.source">
					<Option v-for="option in sourceOptions" :value="option.value" :key="option.value">{{option.label}}</Option>
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
			lable: {
				type: String,
				default: ''
			},
			sourceOptions: {
				type: Array,
				default: function() {
					return []
				}
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
		    return {}
		},
		computed: {
			inputForm() {
				return this.formData[this.name]
			}
		}
	}
</script>
