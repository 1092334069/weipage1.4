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

		// 插件属性数据列表
		this.pluginAttrDataList = []

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
		if (this.pluginAttrDataList.length && pluginOption && pluginOption.pluginId && pluginOption.indexList && pluginOption.indexList.length) {
			for (let i = 0; i < this.pluginAttrDataList.length; i++) {
				if (this.pluginAttrDataList[i].pluginId === pluginOption.pluginId) {
					v = this.pluginAttrDataList[i].value
					for (let j = 0; j < pluginOption.indexList.length; j++) {
						if (Array.isArray(v)) {
							v = v[pluginOption.indexList[j]]
						}
					}
				}
			}
		}
		return v ? v : ''
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
	*	}
	*/
	doInterfaceListAction(count, list, pluginOption, resCallback) {
		if (count > 100000 || !list || !list.length) {
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
					_this.setInterfaceData(param.url, res, param.keyList)
					_this.doPluginAttr(param.url)
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
		const actionData = this.parseActionDataValue(actionItem.action.type, actionItem.action.value)
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
	doActionById(actionId) {
		for (let i = 0; i < this.actionDataList.length; i++) {
			const actionItem = this.actionDataList[i]
			if (actionItem.action && actionItem.actionId === actionId) {
				this.doAction(actionItem)
			}
		}
	}
	/*
	*	执行加载完成立即触发的响应
	*/
	doLoadingAction() {
		for (let i = 0; i < this.actionDataList.length; i++) {
			const actionItem = this.actionDataList[i]
			if (actionItem.action && actionItem.action.condition === 'loading') {
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
	*			indexList 	插件下标标识（列表获取属性时使用）
	*		}
	*	}
	*/
	doEventList(count, eventList, pluginOption) {
		if (count > 100000 || !eventList || !eventList.length) {
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
				this.doActionById(event.value.actionId)
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
	*		indexList 	插件下标标识（列表获取属性时使用）
	*	}
	*/
	doPluginEvent(pluginId, indexList) {
		const eventDataList = JSON.parse(JSON.stringify(this.eventDataList))
		for (let i = 0; i < eventDataList.length; i++) {
			if (eventDataList[i].pluginId === pluginId) {
				this.doEventList(0, eventDataList[i].eventList, {
					pluginId,
					indexList
				})
				break
			}
		}
	}
	// 执行插件属性
	doPluginAttr(url) {
		for (let i = 0; i < this.pluginAttrDataList.length; i++) {
			if (url === this.pluginAttrDataList[i].url) {
				this.pluginAttrDataList[i].value = this.getInterfaceKeyData(url, this.pluginAttrDataList[i].keyList)
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
		this.doInterfaceListAction(0, interfaceList, {}, resCallback)
	}
	/* 
	*	解析请求参数
	*	param: {
	*		paramList 		参数列表
	*		pluginOption	插件配置（用于列表的属性遍历）
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
	*		},
	*		pluginOption 插件配置（用于列表的属性遍历）
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
	/* 	深度解析配置数据
	*	actionDataList 		所有响应列表
	*	pluginAttrDataList	所有属性列表
	*	eventDataList		所有事件列表
	*/
	parseConfigurationDataList(count, pluginList) {
		if (count > 100000) {
			return
		}
		for (let i = 0; i < pluginList.length; i++) {
			if (pluginList[i].base && pluginList[i].base.actionList && pluginList[i].base.actionList.length) {
				for (let j = 0; j < pluginList[i].base.actionList.length; j++) {
					this.actionDataList.push({
						actionId: pluginList[i].base.actionList[j].actionId,
						action: pluginList[i].base.actionList[j],
						plugin: pluginList[i]
					})
				}
			}
			if (pluginList[i].base && pluginList[i].base.attrList && pluginList[i].base.attrList.length) {
				for (let j = 0; j < pluginList[i].base.attrList.length; j++) {
					this.pluginAttrDataList.push({
						pluginId: pluginList[i].pluginId,
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
					eventList: pluginList[i].event.eventList
				})
			}
			if (pluginList[i].pluginList && pluginList[i].pluginList.length) {
				this.parseConfigurationDataList(count += 1, pluginList[i].pluginList)
			}
		}
	}
	// 获取相应数据值
	parseActionDataValue(type, value) {
		if (type === 'interface') {
			return this.getInterfaceKeyData(value.url, value.keyList)
		}
	}
	// 设置接口数据
	setInterfaceData(url, data, keyList) {
		if (keyList && keyList.length) {
			const mergeData = this.getInterfaceKeyData(url, keyList)
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
	mergeDataByKeyList(count, sourceData, mergeData, keyList) {
		if (count  > 100000 || !keyList.length) {
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
	// 获取接口键值
	getInterfaceKeyData(url, keyList) {
		try {
			let data = this.getInterfaceData(url)
			for (let i = keyList.length - 1; i >= 0; i--) {
				if (data.hasOwnProperty(keyList[i])){
					data = data[keyList[i]]
				} else if (Array.isArray(data)) {
					let list = []
					for (let j = 0; j < data.length; j++) {
						list.push(data[j][keyList[i]])
					}
					data = list
				} else {
					data = ''
				}
			}
			return data
		} catch (e) {
			return ''
		}
	}
}

const mobileAction = new MobileAction()

export {
	mobileAction
}
