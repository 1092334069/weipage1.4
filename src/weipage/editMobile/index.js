import 'babel-polyfill'
import '@assets/css/reset.css'
import '@assets/css/weipage/mobile.css'
import './style.css'

import '@plugin/view.js'

import { dropAction } from '@assets/js/weipage/dropAction.js'
import { viewAction } from '@assets/js/weipage/viewAction.js'

var weipage = new Vue({
	el: '#weipage',
	data() {
		return {
			pluginList: []
		}
	}
})

// 拖拽初始化
dropAction.init({
	mouseDownCallback: (pluginId) => {
		window.parent.pluginOperateAction.selectPlugin(pluginId)
	},
	mouseUpCallback: (res) => {
		viewAction.buildList()
		const ret = viewAction.operationView(res)
		window.parent.pluginOperateAction.pluginMove(ret)
	},
	resizeCallback: (pluginId, res) => {
		if (pluginId && res) {
			const plugin = window.parent.pluginOperateAction.pluginSearch(pluginId)
			if (res.width && res.width > 0) {
				plugin.style.width = res.width
			}
			if (res.height && res.height > 0) {
				plugin.style.height = res.height
			}
		}
	}
})

/*  父iframe调用方法
*	更新插件列表
*	必须深度拷贝pluginList
*/
window.uploadPluginList = function(pluginList, deep) {
	weipage.pluginList = JSON.parse(JSON.stringify(pluginList))
}

