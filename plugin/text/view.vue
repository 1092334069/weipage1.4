<template>
	<div class="text plugin" :data-id="viewData.pluginId" :style="parseNormalStyle()">
		<template v-if="viewData.base.data" v-for="item in parseTextHtml(viewData.base.data)">
			<span>{{item}}</span><br />
		</template>
		<span v-else>{{viewData.base.name}}</span>
		<Icon size="12" class="drop-icon" type="md-move" />
	</div>
</template>

<script>
	import styleView from '../styleView.js'

	export default {
		name: "textView",
		props: {
			viewData: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data () {
		    return {}
		},
		methods: styleView
	}
</script>

<style scoped>
	.text{
		display:inline-block;
		max-width:100%;
		word-wrap:break-word;
		position:relative;
	}
</style>