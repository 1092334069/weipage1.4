<template>
	<div class="image-upload">
		<div v-if="model!==''" class="upload-btn" @click="selectImage">
			<img :src="model" />
		</div>
		<Icon v-else class="btn" type="ios-image-outline" size="68" @click="selectImage" />
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
	.upload-btn img{
		width:68px;
		height:68px;
	}
	.btn{
		cursor:pointer;
	}
</style>