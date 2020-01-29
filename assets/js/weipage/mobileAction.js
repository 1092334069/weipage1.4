/*
*	预览工具方法
*/
import { ajaxOnce } from '../ajaxOnce'

class MobileAction {
	constructor() {
		// 接口数据列表
		this.interfaceDataList = []

		// 响应数据列表
		this.actionDataList = []

		// 事件数据列表
		this.eventDataList = []

		// 属性数据列表
		this.attrDataList = []

		// 计数器数据列表
		this.countDataList = []
		this.countAction = () => {}
	}
	// 获取链接参数
	getQueryParam(name) {
		const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
        const r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2])
        return ''
	}
	// 获取缓存参数
	getSessionStorageParam(name) {
		if (typeof sessionStorage[name] === 'number' || typeof sessionStorage[name] === 'string' || typeof sessionStorage[name] === 'object') {
			return sessionStorage[name]
		} else {
			return ''
		}
	}
	// 获取表单参数
	getFormParam(name) {
		const selector = $(`.form-input[name='${name}']`)
		if (selector.length) {
			return selector.val()
		} else {
			return ''
		}
	}
	getCountParam(name) {
		for (let i = 0; i < this.countDataList.length; i++) {
			if (name === this.countDataList[i].countId) {
				this.setCountAction(name)
				return this.countDataList[i].data
			}
		}
		return 0
	}
	// 获取插件属性
	getPluginAttr(pluginOption) {
		let v = ''
		if (this.attrDataList.length && pluginOption && pluginOption.pluginId) {
			for (let i = 0; i < this.attrDataList.length; i++) {
				if (this.attrDataList[i].pluginId === pluginOption.pluginId && this.attrDataList[i].indexs === pluginOption.indexs) {
					v = this.attrDataList[i].value
				}
			}
		}
		return v || ''
	}
	// 设置自增自减
	setCountAction(countId) {
		this.countAction = () => {
			for (let i = 0; i < this.countDataList.length; i++) {
				if (countId === this.countDataList[i].countId) {
					if (this.countDataList[i].rule === 'add') {
						this.countDataList[i].data += this.countDataList[i].cardinal
					} else {
						this.countDataList[i].data -= this.countDataList[i].cardinal
					}
				}
			}
		}
	}
	/* 	深度执行接口响应 
	*	param: {
	*		count 	计数器（防止死循环）
	*		list 	接口列表
	*		pluginOption {
	*			pluginId
	*			indexs
	*		}
	*	}
	*/
	doInterfaceListAction(count, list, pluginOption, resCallback) {
		if (count > 100000 || !list || !list.length) {
			resCallback()
			return
		}
		const _this = this
		const item = list.splice(0, 1)
		let param = {}
		if (item && item.length) {
			param = item[0]
		}
		ajaxOnce.ajax({
			url: param.url,
			type: param.type,
			data: this.parseAJaxData(param.param, pluginOption),
			dataType: param.dataType,
			success: function(res) {
				if (res) {
					_this.setInterfaceData(param.url, res, param.keyList, pluginOption)
					//_this.doPluginAttr(param.url)
				}
				_this.countAction()
				_this.countAction = () => {}
			},
			complete: function() {
				if (list.length) {
					_this.doInterfaceListAction(count += 1, list, pluginOption, resCallback)
				} else {
					resCallback()
				}
			}
		})
	}
	/*
	*	执行响应
	*	param: {
	*		actionItem 	单个响应
	*	}
	*/
	doAction(actionItem){
		let actionData = ''
		if (actionItem.action.type === 'interface') {
			actionData = this.getInterfaceKeyData(actionItem.action.value.url, actionItem.action.value.keyList, actionItem.indexs)
		}
		if (actionItem.action.namespace && actionItem.action.key) {
			if (actionItem.action.namespace === 'base') {
				actionItem.plugin.base[actionItem.action.key] = actionData
			} else if (actionItem.action.namespace === 'style') {
				actionItem.plugin.style[actionItem.action.key] = actionData
			}
		}
	}
	/* 
	*	根据响应id查找到响应并执行
	*/
	doActionOne(actionId, indexs) {
		for (let i = 0; i < this.actionDataList.length; i++) {
			const actionItem = this.actionDataList[i]
			if (actionItem.action && actionItem.actionId === actionId && actionItem.indexs && actionItem.indexs === actionItem) {
				this.doAction(actionItem)
			}
		}
	}
	/* 	执行事件列表
	*	param:{
	*		count 		计数器
	*		eventList 	事件列表
	*		pluginOption {
	*			pluginId 	插件id
	*			indexs 	插件下标标识（列表获取属性时使用）
	*		}
	*	}
	*/
	doEventList(count, eventList, pluginOption) {
		if (count > 1000000 || !eventList || !eventList.length) {
			return
		}
		const item = eventList.splice(0, 1)
		let event = {}
		if (item && item.length) {
			event = item[0]
		}
		if (event.type && event.value) {
			if (event.type === 'interface') {
				const interfaceList = []
				interfaceList.push({
					url: event.value.url,
					type: event.value.type,
					param: event.value.param,
					dataType: event.value.dataType
				})
				this.doInterfaceListAction(0, interfaceList, pluginOption, () => {
					this.doEventList(count += 1, eventList, pluginOption)
				})
			} else if (event.type === 'normal') {
				this.doActionOne(event.value.actionId, pluginOption.indexs)
				this.doEventList(count += 1, eventList, pluginOption)
			} else if (event.type === 'link') {
				if (window.parent.pageReload) {
					window.parent.pageReload(event.value)
				} else {
					window.location.href = event.value
				}
			} else {
				this.doEventList(count += 1, eventList, pluginOption)
			}
		} else {
			this.doEventList(count += 1, eventList, pluginOption)
		}
	}
	/* 	执行事件
	*	param: {
	*		pluginId 	插件id
	*		indexs 		插件下标标识（列表获取属性时使用）
	*	}
	*/
	doPluginEvent(pluginId, indexs) {
		const eventDataList = JSON.parse(JSON.stringify(this.eventDataList))
		for (let i = 0; i < eventDataList.length; i++) {
			if (eventDataList[i].pluginId === pluginId) {
				this.doEventList(0, eventDataList[i].eventList, {
					pluginId,
					indexs
				})
				break
			}
		}
	}
	// 执行插件属性
	doPluginAttr(url) {
		for (let i = 0; i < this.attrDataList.length; i++) {
			if (url === this.attrDataList[i].url) {
				this.attrDataList[i].value = this.getInterfaceKeyData(url, this.attrDataList[i].keyList, this.attrDataList[i].indexs)
			}
		}
	}
	// 执行滚动事件
	doScrollEvent(type, eventList, resCallback) {
		const interfaceList = []
		for (let i = 0; i < eventList.length; i++) {
			if (eventList[i].direction === type) {
				const item = JSON.parse(JSON.stringify(eventList[i].value))
				item['keyList'] = JSON.parse(JSON.stringify(eventList[i].keyword.keyList))
				interfaceList.push(item)
			}
		}
		if (interfaceList.length) {
			this.doInterfaceListAction(0, interfaceList, {}, resCallback)
		}
	}
	/* 
	*	解析请求参数
	*	param: {
	*		paramList 		参数列表
	*		pluginOption {
	*			pluginId
	*			indexs
	*		}
	*	}
	*/
	parseAJaxData(paramList, pluginOption) {
		const data = {}
		for (let i = 0; i < paramList.length; i++) {
			data[paramList[i].key] = this.parseAjaxDataValue(paramList[i].value, pluginOption)
		}
		return data
	}
	/*
	*	解析参数来源
	*	param: {
	*		value: {
	*			data 	数据值
	*			source 	数据源
	*		}
	*		pluginOption {
	*			pluginId
	*			indexs
	*		}
	*	}
	*/
	parseAjaxDataValue(value, pluginOption) {
		if (value.source === 'static') {
			return value.data
		} else if (value.source === 'url') {
			return this.getQueryParam(value.data)
		} else if (value.source === 'sessionStorage') {
			return this.getSessionStorageParam(value.data)
		} else if (value.source === 'form') {
			return this.getFormParam(value.data)
		} else if (value.source === 'attr') {
			return this.getPluginAttr(pluginOption)
		} else if (value.source === 'count') {
			return this.getCountParam(value.data)
		} else {
			return ''
		}
	}
	// 设置接口数据
	setInterfaceData(url, data, keyList, pluginOption) {
		if (keyList && keyList.length) {
			const mergeData = this.getInterfaceKeyData(url, keyList, pluginOption.indexs)
			if (Array.isArray(mergeData)) {
				this.mergeDataByKeyList(0, data, mergeData, keyList)
				for (let i = 0; i < this.interfaceDataList.length; i++) {
					if (url === this.interfaceDataList[i].url){
						this.interfaceDataList[i].data = data
					}
				}
			}
		} else {
			this.interfaceDataList.push({
				url,
				data
			})
		}
	}
	// 	合并接口数据
	mergeDataByKeyList(count, sourceData, mergeData, keyList) {
		if (count  > 1000000 || !keyList.length) {
			return
		}
		const key = keyList.splice(0,1)[0]
		if (keyList.length) {
			count += 1
			this.mergeDataByKeyList(count, sourceData[key], mergeData, keyList)
		} else {
			if (Array.isArray(sourceData[key])) {
				for (let i = 0; i < mergeData.length; i++) {
					sourceData[key].push(mergeData[i])
				}
			}
		}
	}
	// 获取接口数据
	getInterfaceData(url) {
		const interfaceDataList = JSON.parse(JSON.stringify(this.interfaceDataList))
		let data = {}
		for (let i = 0; i < interfaceDataList.length; i++) {
			if (interfaceDataList[i].url == url) {
				data = interfaceDataList[i].data
				break
			}
		}
		return data
	}
	/* 
	*	获取接口键值
	*	当键值为对象时取对象属性；当键值为数组时遍历数组，逐个获取数组对象属性
	*/
	getInterfaceKeyData(url, keyList, indexs) {
		try {
			let indexList = []
			if (indexs) {
				const indexLi = indexs.toString().split(',')
				if (indexLi.length) {
					for (let i = indexLi.length - 1; i >= 0; i--) {
						indexList.push(indexLi[i])
					}
				}
			}
			let data = this.getInterfaceData(url)
			for (let i = keyList.length - 1; i >= 0; i--) {
				if (data.hasOwnProperty(keyList[i])){
					data = data[keyList[i]]
				} else if (Array.isArray(data) && data.length) {
					let d = []
					let index = 0
					const temp = indexList.pop()
					if (temp) {
						index = temp
					}
					if (data.length > index) {
						const item = data[index]
						if (item.hasOwnProperty(keyList[i])) {
							data = item[keyList[i]]
						} else {
							data = ''
						}
					} else {
						data = ''
					}
				} else {
					data = ''
				}
			}
			return data
		} catch (e) {
			return ''
		}
	}
	/*
	*	初始化插件列表（过滤掉无效插件）
	*/
	initPluginList(pluginList) {
		this.initParsePluginList(0, pluginList)
	}
	/*
	*	解析初始化插件列表
	*/
	initParsePluginList(count, pluginList) {
		if (count > 1000000) {
			return
		}
		for (let i = 0; i < pluginList.length; i++) {
			// 当数据是面板列表时过滤掉无效子插件
			let firstPluginList = ''
			if (this.checkPanelList(pluginList[i]) && pluginList[i].pluginList.length) {
				firstPluginList = pluginList[i].pluginList.splice(0, 1)
				pluginList[i].pluginList = firstPluginList
			}
			if (pluginList[i].base.actionList && pluginList[i].base.actionList.length) {
				for (let j = 0; j < pluginList[i].base.actionList.length; j++) {
					const actionItem = pluginList[i].base.actionList[j]
					// 执行立即加载响应
					if (actionItem.condition === 'loading') {
						this.doAction({
							actionId: actionItem.actionId,
							indexs: actionItem.indexs,
							action: actionItem,
							plugin: pluginList[i]
						})

						// 执行响应之后对数据进行检测，当数据时列表需要复制插件
						if (firstPluginList) {
							const plugins = []
							if (pluginList[i].base.data && Array.isArray(pluginList[i].base.data)) {
								for (let m = 0; m < pluginList[i].base.data.length; m++) {
									const tempPlugins = this.copyPluginList(0, firstPluginList, m)
									for (let n = 0; n < tempPlugins.length; n++) {
										plugins.push(tempPlugins[n])
									}
								}
							}
							pluginList[i].pluginList = plugins
						}
					}
				}
			}
			if (pluginList[i].pluginList && pluginList[i].pluginList.length) {
				this.initParsePluginList(count++, pluginList[i].pluginList)
			}
		}
	}
	/*
	*	校验是否时面板列表
	*/
	checkPanelList(plugin) {
		if (plugin.pluginType === 'panel' && plugin.base.type !== 'normal') {
			return true
		}
		return false
	}
	/*
	*	裂变数据
	*/
	fissionData(pluginList) {
		this.actionDataList = []
		this.attrDataList = []
		this.eventDataList = []
		this.parseConfigurationDataList(0, pluginList)
		return pluginList
	}
	/* 	深度解析配置数据
	*	actionDataList 		所有响应列表
	*	attrDataList		所有属性列表
	*	eventDataList		所有事件列表
	*/
	parseConfigurationDataList(count, pluginList) {
		if (count > 1000000) {
			return
		}
		for (let i = 0; i < pluginList.length; i++) {
			if (pluginList[i].base && pluginList[i].base.actionList && pluginList[i].base.actionList.length) {
				for (let j = 0; j < pluginList[i].base.actionList.length; j++) {
					this.actionDataList.push({
						actionId: pluginList[i].base.actionList[j].actionId,
						indexs: pluginList[i].base.actionList[j].indexs,
						action: pluginList[i].base.actionList[j],
						plugin: pluginList[i]
					})
				}
			}
			if (pluginList[i].base && pluginList[i].base.attrList && pluginList[i].base.attrList.length) {
				for (let j = 0; j < pluginList[i].base.attrList.length; j++) {
					this.attrDataList.push({
						pluginId: pluginList[i].pluginId,
						indexs: pluginList[i].indexs,
						key: pluginList[i].base.attrList[j].key,
						value: '',
						url: pluginList[i].base.attrList[j].url,
						keyList: pluginList[i].base.attrList[j].keyList
					})
				}
			}
			if (pluginList[i].event && pluginList[i].event.eventList && pluginList[i].event.eventList.length) {
				this.eventDataList.push({
					pluginId: pluginList[i].pluginId,
					indexs: pluginList[i].indexs,
					eventList: pluginList[i].event.eventList
				})
			}
			if (pluginList[i].pluginList && pluginList[i].pluginList.length) {
				this.parseConfigurationDataList(count += 1, pluginList[i].pluginList)
			}
		}
	}
	/*
	*	复制插件列表
	*/
	copyPluginList(count, plugins, indexs) {
		const pluginList = JSON.parse(JSON.stringify(plugins))
		if (count > 1000000) {
			return pluginList
		}
		for (let i = 0; i < pluginList.length; i++) {
			const plugin = pluginList[i]
			this.createIndexs(plugin, indexs)
			if (plugin.base.hasOwnProperty('actionList') && plugin.base.actionList.length) {
				for (let j = 0; j < plugin.base.actionList.length; j++) {	
					this.createIndexs(plugin.base.actionList[j], indexs)
				}
			}
			if (plugin.base.hasOwnProperty('attrList') && plugin.base.attrList.length) {
				for (let j = 0; j < plugin.base.attrList.length; j++) {
					this.createIndexs(plugin.base.attrList[j], indexs)
				}
			}
			if (plugin.hasOwnProperty('pluginList') && plugin.pluginList.length) {
				plugin.pluginList = this.copyPluginList(count++, plugin.pluginList, indexs)
			}
		}
		return pluginList
	}
	/*
	*	创建下标
	*/
	createIndexs(option, indexs) {
		if (option['indexs']) {
			option['indexs'] += `${indexs},`
		} else {
			option['indexs'] = indexs
		}
	}
}

const mobileAction = new MobileAction()

export {
	mobileAction
}
