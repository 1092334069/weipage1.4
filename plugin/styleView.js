import styleConfig from './styleConfig.js'

const styleView = {
	parsePanelStyle: function() {
		let width,height
		if (this.viewData.style && this.viewData.base) {
			if (this.viewData.style.display === 'none') {
				return 'display:none'
			}
			width = 'width:' + this.viewData.style.width + ';'
			if (this.viewData.base.type === 'list') {
				height = 'minHeight:' + (2 * this.viewData.style.height) + ';'
			} else {
				height = 'minHeight:' + this.viewData.style.height + ';'
			}
			return width + height
		} else {
			return ''
		}
	},
	parseTextHtml: function(data) {
		return data.split('↵')
	},
	parseUnit: function(key, str) {
		const isPxUnit = styleView.checkIsPxUnit(key)
		if (isPxUnit) {

		} else {
			return str
		}
	},
	checkIsPxUnit: function(key) {
		if (styleConfig[key] && styleConfig[key].isPx) {
			return true
		} else {
			return false
		}
	},
	parseNormalStyle: function() {
		let style = ''
		for (let key in this.viewData.style) {
			style += `${key}:${this.viewData.style[key]};`
		}
		return style
	}
 }

export default styleView
