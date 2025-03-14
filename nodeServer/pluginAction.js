const pluginConfig = require('../plugin/pluginConfig')

/* 
*	sketch创建插件列表
*	param {
*		localKey	用户标示
*		scaleplateList	坐标列表
*		layerList		图层列表
*		imageSource		图片资源
*		imgFileDir		图片资源文件夹
*	}	
*/
function createSketchPluginList(localKey, scaleplateList, layerList, imageSource, imgFileDir) {
	const pluginList = []
	for (let i = 0; i < scaleplateList.length; i++) {
		let height = 0
		if (i > 0) {
			height = scaleplateList[i] - scaleplateList[i-1]
		} else {
			height = scaleplateList[i]
		}
		const style = {
			width: 375,
			height,
			position: 'relative'
		}
		const panelPlugin = createPanel(localKey, '面板', '面板', style)
		pluginList.push(panelPlugin)
	}
	for (let i = 0; i < layerList.length; i++) {
		for (let j = 0; j < scaleplateList.length; j++) {
			if ((layerList[i].place.top + layerList[i].place.height) <= scaleplateList[j]) {
				const pluginName = layerList[i].id
				let top = 0
				if (j > 0) {
					top = scaleplateList[j-1]
				}
				let pluginStyle = {}
				if (layerList[i].style) {
					pluginStyle = layerList[i].style
				}
				pluginStyle['position'] = 'absolute'
				pluginStyle['top'] = layerList[i].place.top - top
				pluginStyle['left'] = layerList[i].place.left
				pluginStyle['width'] = layerList[i].place.width
				pluginStyle['height'] = layerList[i].place.height
				if (imageSource[layerList[i].src]) {
					pluginStyle['backgroundRepeat'] = 'no-repeat'
					pluginStyle['backgroundPosition'] = 'center'
					pluginStyle['backgroundImage'] = imgFileDir + '/' + imageSource[layerList[i].src]
				}
				pluginStyle['backgroundColor'] = 'rgba(0,0,0,0)'
				const panelPlugin = createPanel(localKey, '', pluginName, pluginStyle)
				// if (layerList[i].content) {
				// 	panelPlugin.pluginList.push(createText(localKey, layerList[i].content))
				// }
				pluginList[j].pluginList.push(panelPlugin)
				break
			}
		}
	}
	return pluginList
}

function createChromePlugin(localKey, plugin){
	if (plugin.nodeName === 'SPAN' && plugin.data) {
		if (plugin.childList.length) {
			const panel = createPanel(localKey, plugin.className, plugin.data || '', plugin.style)
			if (plugin.data) {
				panel.pluginList.push(createText(localKey, plugin.className, plugin.data || '', plugin.style))
			}
			for (let i = 0; i < plugin.childList.length; i++) {
				panel.pluginList.push(createText(localKey, plugin.childList[i].className, plugin.childList[i].data || '', plugin.childList[i].style))
			}
			return panel
		}
		return createText(localKey, plugin.className, plugin.data || '', plugin.style)
	} else if (plugin.nodeName === 'INPUT' || plugin.nodeName === 'SELECT') {
		return createForm(localKey, plugin.className, plugin.data || '', plugin.style)
	} else if (plugin.nodeName === 'IMG') {
		return createImage(localKey, plugin.className, plugin.data || '', plugin.style)
	} else {
		return createPanel(localKey, plugin.className, plugin.data || '', plugin.style)
	}
}

// 创建面板插件
function createPanel(localKey, name, data, style) {
	const plugin = JSON.parse(JSON.stringify(pluginConfig['panel']))
	plugin['pluginId'] = getLocalUuid(localKey)
	plugin.base.name = name
	if (style) {
		for (let key in style) {
			plugin.style[key] = style[key]
		}
	}
	return plugin
}

// 创建文本插件
function createText(localKey, name, data, style) {
	const plugin = JSON.parse(JSON.stringify(pluginConfig['text']))
	plugin['pluginId'] = getLocalUuid(localKey)
	plugin.base.name = name
	plugin.base.data = data
	if (style) {
		for (let key in style) {
			plugin.style[key] = style[key]
		}
	}
	return plugin
}

// 创建表单插件
function createForm(localKey, name, data, style) {
	const plugin = JSON.parse(JSON.stringify(pluginConfig['form']))
	plugin['pluginId'] = getLocalUuid(localKey)
	plugin.base.name = name
	plugin.base.data = data
	if (style) {
		for (let key in style) {
			plugin.style[key] = style[key]
		}
	}
	return plugin
}

// 创建图片插件
function createImage(localKey, name, data, style) {
	const plugin = JSON.parse(JSON.stringify(pluginConfig['image']))
	plugin['pluginId'] = getLocalUuid(localKey)
	plugin.base.name = name
	plugin.base.data = data
	if (style) {
		for (let key in style) {
			plugin.style[key] = style[key]
		}
	}
	return plugin
}

let uuIndex = 0

// 获取全局唯一id
function getLocalUuid(localKey) {
	const timeString = Date.now()
	uuIndex += 1
	return 'p' + localKey + timeString + uuIndex
}

module.exports = {
	createSketchPluginList,
	createChromePlugin
}