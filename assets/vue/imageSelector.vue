<template>
	<div>
		<ul class="image-model-list">
			<li v-for="item in imageList" class="image-model-item">
				<img :src="item.url" @click="imageModelSelect(item.url)" />
				<Icon class="delete" type="ios-close-circle-outline" size="12" />
			</li>
		</ul>
		<div class="footer">
			<input class="hidden" id="file" type="file" />
			<Button type="info" @click="uploadImage">上传</Button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "imageSelector",
		props: {
			imageList: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data () {
			return {}
		},
		methods: {
			imageModelSelect: function(url) {
				this.$emit('image-model-select', url)
			},
			uploadImage: function() {
				this.$emit('upload-image')
			}
		}
	}
</script>

<style scoped>
.image-model-list{
	padding:20px 4px;
	overflow:hidden;
}
.image-model-list .image-model-item{
	width:80px;
	height:80px;
	padding:10px;
	position:relative;
	float:left;
}
.image-model-item img{
	width:100%;
	height:100%;
	cursor:pointer;
}
.image-model-item .delete{
	position:absolute;
	right:0;
	top:0;
	cursor:pointer;
}
.footer{
	margin-left:12px;
}
</style>
