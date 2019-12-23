<template>
	<div>
		<Tabs type="card" value="base">
			<TabPane label="基础" name="base">
				<ul class="style-list">
					<li :class="parseClass('width')" @click="selectStyle('width', '')">
						<img src="../img/style/width.png" />
					</li>
					<li :class="parseClass('minWidth')" @click="selectStyle('minWidth', '')">
						<img src="../img/style/minWidth.png" />
					</li>
					<li :class="parseClass('maxWidth')" @click="selectStyle('maxWidth', '')">
						<img src="../img/style/maxWidth.png" />
					</li>	
				</ul>
				<ul class="style-list">
					<li :class="parseClass('height')" @click="selectStyle('height', '')">
						<img src="../img/style/height.png" />
					</li>
					<li :class="parseClass('minHeight')" @click="selectStyle('minHeight', '')">
						<img src="../img/style/minHeight.png" />
					</li>
					<li :class="parseClass('maxHeight')" @click="selectStyle('maxHeight', '')">
						<img src="../img/style/maxHeight.png" />
					</li>
				</ul>
				<ul class="style-list">
					<li :class="parseClass('backgroundColor')" @click="selectStyle('backgroundColor', '')">
						<img src="../img/style/backgroundColor.png" />
					</li>
					<li :class="parseClass('backgroundImage')" @click="selectStyle('backgroundImage', '')">
						<img src="../img/style/backgroundImage.png" />
					</li>
				</ul>
			</TabPane>
			<TabPane label="盒子模型" name="box">
				<ul class="style-list">
					<li :class="parseClass('margin')" @click="selectStyle('margin', '')">
						<img src="../img/style/margin.png" />
					</li>
					<li :class="parseClass('marginTop')" @click="selectStyle('marginTop', '')">
						<img src="../img/style/marginTop.png" />
					</li>
					<li :class="parseClass('marginRight')" @click="selectStyle('marginRight', '')">
						<img src="../img/style/marginRight.png" />
					</li>
					<li :class="parseClass('marginBottom')" @click="selectStyle('marginBottom', '')">
						<img src="../img/style/marginBottom.png" />
					</li>
					<li :class="parseClass('marginLeft')" @click="selectStyle('marginLeft', '')">
						<img src="../img/style/marginLeft.png" />
					</li>
				</ul>
				<ul class="style-list">
					<li :class="parseClass('padding')" @click="selectStyle('padding', '')">
						<img src="../img/style/padding.png" />
					</li>
					<li :class="parseClass('paddingTop')" @click="selectStyle('paddingTop', '')">
						<img src="../img/style/paddingTop.png" />
					</li>
					<li :class="parseClass('paddingRight')" @click="selectStyle('paddingRight', '')">
						<img src="../img/style/paddingRight.png" />
					</li>
					<li :class="parseClass('paddingBottom')" @click="selectStyle('paddingBottom', '')">
						<img src="../img/style/paddingBottom.png" />
					</li>
					<li :class="parseClass('paddingLeft')" @click="selectStyle('paddingLeft', '')">
						<img src="../img/style/paddingLeft.png" />
					</li>
				</ul>
				<ul class="style-list">
					<li :class="parseClass('border')" @click="selectStyle('border', '1px solid #e5e5e5')">
						<img src="../img/style/border.png" />
					</li>
					<li :class="parseClass('borderTop')" @click="selectStyle('borderTop', '1px solid #e5e5e5')">
						<img src="../img/style/borderTop.png" />
					</li>
					<li :class="parseClass('borderRight')" @click="selectStyle('borderRight', '1px solid #e5e5e5')">
						<img src="../img/style/borderRight.png" />
					</li>
					<li :class="parseClass('borderBottom')" @click="selectStyle('borderBottom', '1px solid #e5e5e5')">
						<img src="../img/style/borderBottom.png" />
					</li>
					<li :class="parseClass('borderLeft')" @click="selectStyle('borderLeft', '1px solid #e5e5e5')">
						<img src="../img/style/borderLeft.png" />
					</li>
				</ul>
			</TabPane>
			<TabPane label="字体" name="font">
				<ul class="style-list">
					<li :class="parseClass('fontSize')" @click="selectStyle('fontSize', '12')">
						<img src="../img/style/fontSize.png" />
					</li>
					<li :class="parseClass('color')" @click="selectStyle('color', '#333333')">
						<img src="../img/style/color.png" />
					</li>
					<li :class="parseClass('fontWeight')" @click="selectStyle('fontWeight', 'bold')">
						<img src="../img/style/fontWeight.png" />
					</li>
					<li :class="parseClass('lineHeight')" @click="selectStyle('lineHeight', '16')">
						<img src="../img/style/lineHeight.png" />
					</li>
					<li :class="parseClass('textAlign')" @click="selectStyle('textAlign', 'left')">
						<img src="../img/style/textAlign.png" />
					</li>
					<li :class="parseClass('textIndent')" @click="selectStyle('textIndent', '')">
						<img src="../img/style/textIndent.png" />
					</li>
				</ul>
			</TabPane>
			<TabPane label="定位" name="position">
				<ul class="style-list">
					<li :class="parseClass('position', 'static')" @click="selectStyle('position', 'static')">
						<img src="../img/style/position-static.png" />
					</li>
					<li :class="parseClass('position', 'absolute')" @click="selectStyle('position', 'absolute')">
						<img src="../img/style/position-absolute.png" />
					</li>
					<li :class="parseClass('position', 'fixed')" @click="selectStyle('position', 'fixed')">
						<img src="../img/style/position-fixed.png" />
					</li>
				</ul>
				<ul class="style-list">
					<li :class="parseClass('top')" @click="selectStyle('top', '')">
						<img src="../img/style/top.png" />
					</li>
					<li :class="parseClass('right')" @click="selectStyle('right', '')">
						<img src="../img/style/right.png" />
					</li>
					<li :class="parseClass('bottom')" @click="selectStyle('bottom', '')">
						<img src="../img/style/bottom.png" />
					</li>
					<li :class="parseClass('left')" @click="selectStyle('left', '')">
						<img src="../img/style/left.png" />
					</li>
				</ul>
				<ul class="style-list">
					<li :class="parseClass('zIndex')" @click="selectStyle('zIndex', '1')">
						<img src="../img/style/zIndex.png" />
					</li>
				</ul>
			</TabPane>
			<TabPane label="其它" name="other">
				<ul class="style-list">
					<li :class="parseClass('borderRadius')" @click="selectStyle('borderRadius', '')">
						<img src="../img/style/borderRadius.png" />
					</li>
					<li :class="parseClass('boxShadow')" @click="selectStyle('boxShadow', '')">
						<img src="../img/style/boxShadow.png" />
					</li>
					<li :class="parseClass('opacity')" @click="selectStyle('opacity', '0.5')">
						<img src="../img/style/opacity.png" />
					</li>
					<li :class="parseClass('overflow')" @click="selectStyle('overflow', 'hidden')">
						<img src="../img/style/overflow.png" />
					</li>
				</ul>
			</TabPane>
		</Tabs>
	</div>
</template>

<script>
	export default {
		name: "styleSelector",
		props: {
			editForm: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data () {
			return {}
		},
		methods: {
			parseClass: function(key, value) {
				let styleObject = {}
				if (this.editForm) {
					styleObject = this.editForm.style
				}
				let hasSelect = false
				for (let k in styleObject) {
					if (k === key) {
						if (value) {
							if (styleObject[k] === value) {
								hasSelect = true
							}
						} else {
							hasSelect = true
						}
						break
					}
				}
				if (hasSelect) {
					return 'current'
				} else {
					return ''
				}
			},
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
.style-list li.current{
	opacity: 0.2;
}
</style>
