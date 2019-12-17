import styleConfig from './styleConfig.js'

function checkIsPxUnit(key) {
	if (styleConfig[key] && styleConfig[key].isPx) {
		return true
	} else {
		return false
	}
}

function parseUnit(key, str) {
	const isPxUnit = checkIsPxUnit(key)
	if (isPxUnit) {
		if (typeof str === 'number') {
			return str + 'px'
		} else if (typeof str === 'string') {
			const strList = str.trim().split(' ')
			for (let i = 0; i < strList.length; i++) {
				if (strList[i].indexOf('%') > -1 || strList[i].indexOf('px') > -1) {
					break
				}
				const num = parseFloat(strList[i])
				if (!isNaN(num)) {
					strList[i] = num + 'px'
				}
			}
			return strList.join(' ')
		} else {
			return str
		}	
	} else {
		return str
	}
}

const styleView = {
	parsePanelStyle: function() {
		let height
		if (this.viewData.style && this.viewData.base) {
			if (this.viewData.style.display === 'none') {
				return 'display:none'
			}
			if (this.viewData.base.type === 'list') {
				height = 'minHeight:' + (2 * this.viewData.style.height) + ';'
			} else {
				height = 'minHeight:' + this.viewData.style.height + ';'
			}
			return height
		} else {
			return ''
		}
	},
	parseTextHtml: function(data) {
		return data.split('↵')
	},
	parseNormalStyle: function() {
		let style = ''
		for (let key in this.viewData.style) {
			let value = this.viewData.style[key]
			if (key === 'backgroundImage') {
				value = `url(${value})`
			}
			style += `${key}:${parseUnit(key, value)};`
		}
		return style
	}
 }

export default styleView
