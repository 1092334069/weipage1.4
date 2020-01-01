const mobileView = {
	parseTextHtml: function(data) {
		return data.split('↵')
	},
	parseNormalStyle: function() {
		let style = ''
		for (let key in this.viewData.style) {
			style += `${key}:${this.viewData.style[key]};`
		}
		return style
	},
	doEvent: function(pluginId) {
		this.$emit('do-event', {
			pluginId
		})
	}
 }

export default mobileView
