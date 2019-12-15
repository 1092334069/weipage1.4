<template>
	<div class="image-upload">
		<Form :label-width="80">
			<FormItem :label="lable">
				<div v-if="model!==''" class="upload-btn" @click="selectImage">
					<img :src="model" />
				</div>
				<div v-else class="upload-btn default" @click="selectImage"></div>
			</FormItem>
		</Form>
	</div>
</template>

<script>
	export default {
		name: "imageUpload",
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
			}
		},
		data () {
		    return {}
		},
		methods: {
			selectImage: function() {
				this.$emit('selectImage', {
					formData: this.formData,
					name: this.name
				})
			}
		},
		computed: {
			model: {
				get() {
					return this.formData[this.name]
				},
				set(val) {
					this.formData[this.name] = val
					this.$emit('formChange', {
						name: this.name,
						value: val
					})
				}
			}
		}		
	}
</script>

<style scoped>
	.image-upload{
		margin:6px;
		position:relative;
		display:inline-block;
	}
	.upload-btn{
		display:inline-block;
		width:68px;
		height:68px;
		cursor:pointer;
	}
	.upload-btn.default{
		background-image:url('../img/weipage/icon-upload.png');
		background-size:100% 100%;
	}
	.upload-btn img{
		width:68px;
		height:68px;
	}
</style>