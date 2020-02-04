const pluginAction = require('./pluginAction')

function chromeToWeipage(data, localKey, callback) {
	const pluginList = []
	const style = {}
	if (data && data.nodeName === 'BODY') {
		for (let i = 0; i < data.childList.length; i++) {
			const plugins = []
			createPlugin(0, data.childList[i], localKey, plugins)
			if (plugins.length) {
				pluginList.push(plugins[0])
			}
		}
		parseStyle(data.style)
		for (let key in data.style) {
			style[key] = data.style[key]
		}
	} else {
		createPlugin(0, data, localKey, pluginList)
	}
	callback(JSON.stringify({
		code: 200,
		data: {
			pluginList,
			style
		},
		message: '生成成功'
	}))
}

function createPlugin(count, data, localKey, pluginList){
	if (count > 1000000) {
		return
	}
	if (data) {
		parseStyle(data.style)
		const pluginData = pluginAction.createChromePlugin(localKey, data)
		if (pluginData) {
			if (pluginData.pluginList && data.childList && data.childList.length) {
				for (let i = 0; i < data.childList.length; i++) {
					createPlugin(count += 1, data.childList[i], localKey, pluginData.pluginList)
				}
			}
			pluginList.push(pluginData)
		}
	}
}

function parseStyle(style) {
	if (!style.hasOwnProperty('height')) {
		style['height'] = 'auto'
	}
}

module.exports = {
	chromeToWeipage
}