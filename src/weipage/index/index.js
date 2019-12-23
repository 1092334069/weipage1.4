import 'babel-polyfill'

import '../../../assets/css/reset.css'
import '../../../assets/css/weipage/formList.css'
import './style.css'

import '../../../plugin'
import '../../../assets/vue'

import { commonAction } from '../../../assets/js/commonAction.js'
import { pluginSearch, pluginMove, pluginRemove, pluginTreeSelect, formTreeSelect } from '../../../assets/js/weipage/formAction.js'
import { createPlugin } from '../../../plugin/pluginAction.js'
import { interfaceAction } from '../../../assets/js/weipage/interfaceAction.js'
import { imageAction } from '../../../assets/js/weipage/imageAction.js'
import { weipageAction } from '../../../assets/js/weipage/weipageAction.js'

// 回调响应
const callbackAction = {
	selectInterface: () => {},
	selectInterfaceParam: () => {},
	selectPluginTree: () => {},
	selectForm: () => {},
	selectImage: () => {}
}

// 	接口对话框列表配置
var interfaceTable = [
	{title: '接口名称', key: 'name'},
	{title: '接口地址', key: 'url'},
	{title: '操作', key: 'action', render: (h, params) => {
		return h('Button', {
			on: {
				click: () => {
					callbackAction.selectInterface(params.row.id)
				}
			}
		}, '选取')
	}}
]

var weipage = new Vue({
	el: '#weipage',
	data() {
		return {
			// 新增状态为0
			weipageId: 0,

			// 	微页面基础
			weipage: {
				name: '',
				describes: '',
				cover: '',
				pageName: '',
				backgroundColor: '',
				interfaceList: [],
				scrollEvent: {
					eventList: []
				},
				countEvent: {
					eventList: []
				}
			},

			editForm: '',
			editFormStyle: {},

			// 插件编辑
			pluginList: [],
			selectPluginId: '',
			selectForm: 'base',

			// 插件树
			pluginTreeModel: false,

			// 接口对话框
			interfaceModel: false,
			interfaceTable,
			interfaceTableData: {
				list: [],
				total: 0,
				page: 1,
				size: 10,
			},

			imageModel: false,
			imageTabelData: {
				list: [],
				total: 0,
				page: 1,
				size: 10,
			},

			// 接口树
			interfaceTreeModel: false,
			interfaceTree:[],

			// 表单树
			formTreeModel: false,

			// 	样式框
			styleModel: false
		}
	},
	methods: {
		selectPlugin(pluginId) {
			this.changeFormTab('base')
			this.selectPluginId = pluginId
			weipageViewSelectPluginId()
		},
		insertPlugin(pluginType) {
			const plugin = createPlugin(pluginType)
			if (plugin) {
				this.selectPlugin(plugin.pluginId)
				this.pluginList.push(plugin)
			}
		},
		getSelectPlugin() {
			return pluginSearch(this, this.selectPluginId)
		},
		removePlugin() {
			pluginRemove(this, this.selectPluginId)
			this.selectPlugin('')
		},
		changeFormTab(form) {
			this.selectForm = form
		},
		openPluginTreeModel(res) {
			this.pluginTreeModel = true
			if (res) {
				callbackAction.selectPluginTree = (pluginId) => {
					pluginTreeSelect(this, res, pluginId)
				}
			} else {
				callbackAction.selectPluginTree = (pluginId) => {
					this.selectPlugin(pluginId)
				}
			}
		},
		closePluginTreeModel() {
			this.pluginTreeModel = false
		},
		pluginTreeSelect(pluginId) {
			callbackAction.selectPluginTree(pluginId)
			this.closePluginTreeModel()
		},
		openInterfaceModel(res) {
			interfaceAction.getInterfaceList()
			this.interfaceModel = true
			callbackAction.selectInterface = (interfaceId) => {
				interfaceAction.addInterface(res, interfaceId)
			}
		},
		closeInterfaceModel() {
			this.interfaceModel = false
		},
		openInterfaceTreeModel(res) {
			this.interfaceTreeModel = true
			callbackAction.selectInterfaceParam = (option) => {
				const optionObject = JSON.parse(JSON.stringify(option))
				for (let key in optionObject) {
					res.formData[res.name][key] = optionObject[key]
				}
			}
		},
		closeInterfaceTreeModel() {
			this.interfaceTreeModel = false
		},
		selectInterfaceParam(option) {
			this.closeInterfaceTreeModel()
			callbackAction.selectInterfaceParam(option)
		},
		deleteInterface(interfaceId) {
			interfaceAction.deleteInterface(interfaceId)
		},
		openFormTreeModel(option) {
			this.formTreeModel = true
			if (option && option.source === 'event') {
				callbackAction.selectForm = (pluginId) => {
					formTreeSelect(this, pluginId, option.key)
				}
			}
		},
		closeFormTreeModel() {
			this.formTreeModel = false
		},
		formTreeSelect(pluginId) {
			this.closeFormTreeModel()
			callbackAction.selectForm(pluginId)
		},
		changeInterfacePage(option) {
			this.interfaceTableData.page = option
			interfaceAction.getInterfaceList()
		},
		openImageModel: function() {
			imageAction.getImageList()
			this.imageModel = true
		},
		closeImageModel: function() {
			this.imageModel = false
		},
		selectImage(res) {
			callbackAction.selectImage = (url) => {
				res.formData[res.name] = url
			}
			this.openImageModel()
		},
		imageModelSelect(url) {
			callbackAction.selectImage(url)
			this.closeImageModel()
		},
		openStyleModel() {
			this.styleModel = true
		},
		selectStyle(option) {
			let plugin = this.getSelectPlugin()
			let style = JSON.parse(JSON.stringify(plugin.style))
			style[option.key] = option.value
			plugin.style = style
		},
		uploadImage() {
			$('#file').click()
		},
		saveWeipage() {
			this.selectPlugin('')
			const weipageName = this.weipage.name
			const weipageCover = this.weipage.cover
			const weipagePageName = this.weipage.pageName
			if (!weipageName) {
				this.$Message.warning('请填写微页面名称')
				return
			}
			if (!weipageCover) {
				this.$Message.warning('请上传微页面封面')
				return
			}
			if (!weipagePageName) {
				this.$Message.warning('请填写微页面文件名')
				return
			}
			if (this.weipageId) {
				weipageAction.updateWeipage({
					weipageId: this.weipageId,
					name: weipageName,
					describes: this.weipage.describes,
					cover: weipageCover,
					pageName: weipagePageName,
					data: {
						weipage: this.weipage,
						pluginList: this.pluginList,
						interfaceTree: this.interfaceTree
					}
				}, (res) => {
					this.$Message.success('修改成功')
				}, (msg) => {
					if (msg) {
						this.$Message.error(msg)
					} else {
						this.$Message.error('修改失败，请稍后重试')
					}
				})
			} else {
				weipageAction.insertWeipage({
					name: weipageName,
					describes: this.weipage.describes,
					cover: weipageCover,
					pageName: weipagePageName,
					data: {
						weipage: this.weipage,
						pluginList: this.pluginList,
						interfaceTree: this.interfaceTree
					}
				}, (res) => {
					this.weipageId = res.weipageId
					this.$Message.success('创建成功')
				}, (msg) => {
					if (msg) {
						this.$Message.error(msg)
					} else {
						this.$Message.error('创建失败，请稍后重试')
					}
				})
			}
		},
		weipageShowView() {
			window.location.href = `/weipage/view?weipageId=${this.weipageId}`
		}
	},
	watch: {
		pluginList: {
			handler() {
				this.editForm = this.getSelectPlugin()
				weipageViewPluginList()
			},
			deep: true
		},
		selectPluginId() {
			this.editForm = this.getSelectPlugin()
		}
	}
})

interfaceAction.init(weipage)
imageAction.init(weipage)

// weipageId 不为空即为编辑
const weipageId = commonAction.getQueryString('weipageId')
if (weipageId) {
	weipageAction.getWeipageDetail({
		weipageId
	}, (res) => {
		weipage.weipageId = weipageId
		if (res.data) {
			weipage.weipage = res.data.weipage
			weipage.pluginList = res.data.pluginList
			weipage.interfaceTree = res.data.interfaceTree
		}
	})
}

// 图片上传
$('#file').on('change', () => {
	const file = $('#file')
	const formData = new FormData()
	formData.append('file', file[0].files[0])
	$.ajax({
		url: '/api/common/upload',
		type: 'post',
		data: formData,
		contentType: false,
		processData: false,
		dataType: 'json',
		success: function(res) {
			$('#file').val('')
		},
		error: function() {
			$('#file').val('')
		}
	})
})

/*
*	操作子iframe
*/
const weipageViewIframe = $('#weipageView')
let weipageViewOnload = false
const weipageViewCallbackList = []
weipageViewIframe.on('load', function() {
	weipageViewOnload = true
	for (let i = weipageViewCallbackList.length; i--; i >= 0) {
		const callback = weipageViewCallbackList.splice(i, 1)
		callback[0]()
	}
})

// 更新预览页面数据
function weipageViewPluginList() {
	if (weipageViewOnload) {
		const weipageViewWindow = weipageViewIframe[0].contentWindow
		if (weipageViewWindow && weipageViewWindow.uploadPluginList) {
			weipageViewWindow.uploadPluginList(weipage.pluginList)
		} else {
			console.log('not find weipageViewWindow')
		}
	} else {
		weipageViewCallbackList.push(weipageViewPluginList)
	}
}
// 选中插件id
function weipageViewSelectPluginId() {
	if (weipageViewOnload) {
		const weipageViewWindow = weipageViewIframe[0].contentWindow
		if (weipageViewWindow && weipageViewWindow.selectPluginId) {
			weipageViewWindow.selectPluginId(weipage.selectPluginId)
		} else {
			console.log('not find weipageViewWindow')
		}
	} else {
		weipageViewCallbackList.push(weipageViewSelectPluginId)
	}
}

/*
*	被子iframe操作
*/
window.pluginOperateAction = {
	selectPlugin: (pluginId) => {
		weipage.selectPlugin(pluginId)
	},
	pluginMove: (ret) => {
		pluginMove(weipage, ret.type, ret.pluginId, ret.toPluginId)
	},
	pluginSearch: (pluginId) => {
		return pluginSearch(weipage, pluginId)
	}
}
