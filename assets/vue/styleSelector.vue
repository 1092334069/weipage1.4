<template>
	<div>
		<Tabs type="card" value="base">
			<TabPane label="基础" name="base">
				<ul class="style-list">
					<li @click="selectStyle('width', '')"><img src="../img/style/width.png" /></li>
					<li @click="selectStyle('minWidth', '')"><img src="../img/style/minWidth.png" /></li>
					<li @click="selectStyle('maxWidth', '')"><img src="../img/style/maxWidth.png" /></li>	
				</ul>
				<ul class="style-list">
					<li @click="selectStyle('height', '')"><img src="../img/style/height.png" /></li>
					<li @click="selectStyle('minHeight', '')"><img src="../img/style/minHeight.png" /></li>
					<li @click="selectStyle('maxHeight', '')"><img src="../img/style/maxHeight.png" /></li>
				</ul>
				<ul class="style-list">
					<li @click="selectStyle('backgroundColor', '')"><img src="../img/style/backgroundColor.png" /></li>
					<li @click="selectStyle('backgroundImage', '')"><img src="../img/style/backgroundImage.png" /></li>
				</ul>
			</TabPane>
			<TabPane label="盒子模型" name="box">
				<ul class="style-list">
					<li @click="selectStyle('margin', '')"><img src="../img/style/margin.png" /></li>
					<li @click="selectStyle('marginTop', '')"><img src="../img/style/marginTop.png" /></li>
					<li @click="selectStyle('marginRight', '')"><img src="../img/style/marginRight.png" /></li>
					<li @click="selectStyle('marginBottom', '')"><img src="../img/style/marginBottom.png" /></li>
					<li @click="selectStyle('marginLeft', '')"><img src="../img/style/marginLeft.png" /></li>
				</ul>
				<ul class="style-list">
					<li @click="selectStyle('padding', '')"><img src="../img/style/padding.png" /></li>
					<li @click="selectStyle('paddingTop', '')"><img src="../img/style/paddingTop.png" /></li>
					<li @click="selectStyle('paddingRight', '')"><img src="../img/style/paddingRight.png" /></li>
					<li @click="selectStyle('paddingBottom', '')"><img src="../img/style/paddingBottom.png" /></li>
					<li @click="selectStyle('paddingLeft', '')"><img src="../img/style/paddingLeft.png" /></li>
				</ul>
				<ul class="style-list">
					<li @click="selectStyle('border', '')"><img src="../img/style/border.png" /></li>
					<li @click="selectStyle('borderTop', '')"><img src="../img/style/borderTop.png" /></li>
					<li @click="selectStyle('borderRight', '')"><img src="../img/style/borderRight.png" /></li>
					<li @click="selectStyle('borderBottom', '')"><img src="../img/style/borderBottom.png" /></li>
					<li @click="selectStyle('borderLeft', '')"><img src="../img/style/borderLeft.png" /></li>
				</ul>
			</TabPane>
			<TabPane label="字体" name="font">
				<ul class="style-list">
					<li @click="selectStyle('fontSize', '12')"><img src="../img/style/fontSize.png" /></li>
					<li @click="selectStyle('color', '#333333')"><img src="../img/style/color.png" /></li>
					<li @click="selectStyle('fontWeight', 'bold')"><img src="../img/style/fontWeight.png" /></li>
					<li @click="selectStyle('lineHeight', '16')"><img src="../img/style/lineHeight.png" /></li>
					<li @click="selectStyle('textAlign', 'left')"><img src="../img/style/textAlign.png" /></li>
					<li @click="selectStyle('textIndent', '')"><img src="../img/style/textIndent.png" /></li>
				</ul>
			</TabPane>
			<TabPane label="定位" name="position">
				<ul class="style-list">
					<li @click="selectStyle('position', 'static')"><img src="../img/style/position-static.png" /></li>
					<li @click="selectStyle('position', 'absolute')"><img src="../img/style/position-absolute.png" /></li>
					<li @click="selectStyle('position', 'fixed')"><img src="../img/style/position-fixed.png" /></li>
				</ul>
				<ul class="style-list">
					<li @click="selectStyle('top', '')"><img src="../img/style/top.png" /></li>
					<li @click="selectStyle('right', '')"><img src="../img/style/right.png" /></li>
					<li @click="selectStyle('bottom', '')"><img src="../img/style/bottom.png" /></li>
					<li @click="selectStyle('left', '')"><img src="../img/style/left.png" /></li>
				</ul>
				<ul class="style-list">
					<li @click="selectStyle('zIndex', '10')"><img src="../img/style/zIndex.png" /></li>
				</ul>
			</TabPane>
			<TabPane label="其它" name="other">
				<ul class="style-list">
					<li @click="selectStyle('borderRadius', '')"><img src="../img/style/borderRadius.png" /></li>
					<li @click="selectStyle('boxShadow', '')"><img src="../img/style/boxShadow.png" /></li>
					<li @click="selectStyle('opacity', '')"><img src="../img/style/opacity.png" /></li>
					<li @click="selectStyle('overflow', '')"><img src="../img/style/overflow.png" /></li>
				</ul>
			</TabPane>
		</Tabs>
	</div>
</template>

<script>
	export default {
		name: "styleSelector",
		props: {
			
		},
		data () {
			return {}
		},
		methods: {
			selectStyle: function(key, value) {
				this.$emit('select-style', {
					key,
					value
				})
			}
		}
	}
</script>

<style scoped>
style-list{
	padding: 20px 0;
}
.style-list li{
	display: inline-block;
	width: 120px;
	height: 150px;
	cursor: pointer;
	margin: 10px;
}
.style-list li img{
	width: 100%;
	height: 100%;
}
</style>
