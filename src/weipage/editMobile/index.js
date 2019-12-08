import 'babel-polyfill'
import '../../../assets/css/reset.css'
import './style.css'

import '../../../plugin/view.js'

var weipage = new Vue({
	el: '#weipage',
	data() {
		return {
			pluginList: [],
			selectPluginId: ''
		}
	}
})


window.uploadPluginList = function(pluginList) {
	weipage.pluginList = pluginList
}
