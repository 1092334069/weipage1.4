const pluginAction = require('./pluginAction')

function chromeToWeipage(data, localKey, callback) {
	const pluginList = []
	createPlugin(0, data, localKey, pluginList)
	callback(JSON.stringify({
		code: 200,
		data: {
			pluginList
		},
		message: '生成成功'
	}))
}

function createPlugin(count, data, localKey, pluginList){
	if (count > 1000000) {
		return
	}
	if (data) {
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

module.exports = {
	chromeToWeipage
}