import 'babel-polyfill'

import '../../css/reset.css'
import '../../css/weipage/index.css'
import '../../css/weipage/formList.css'

import '../../../vueComponent'
import '../../../vueComponents'
import '../../../plugin'
import '../../vue'

import { commonAction } from '../commonAction.js'
import { pluginUpdate, pluginSearch, pluginMove, pluginRemove, pluginTreeSelect, formTreeSelect } from './formAction.js'
import { createPlugin } from '../../../plugin/pluginAction.js'
import { dropAction } from './dropAction.js'
import { interfaceAction } from './interfaceAction.js'
import { imageAction } from './imageAction.js'
import { viewAction } from './viewAction.js'
import { weipageAction } from './weipageAction.js'

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
			formTreeModel: false
		}
	},
	computed: {
		editForm() {
			return pluginSearch(this, this.selectPluginId)
		}
	},
	methods: {
		selectPlugin(pluginId) {
			this.changeFormTab('base')
			this.selectPluginId = pluginId
		},
		insertPlugin(pluginType) {
			const plugin = createPlugin(pluginType)
			if (plugin) {
				this.selectPluginId = plugin.pluginId
				this.pluginList.push(plugin)
			}
		},
		getSelectPlugin() {
			return pluginSearch(this, this.selectPluginId)
		},
		removePlugin(pluginId) {
			pluginRemove(this, pluginId)
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
	}
})

// 拖拽初始化
dropAction.init({
	mouseDownCallback: (pluginId) => {
		weipage.selectPlugin(pluginId)
	},
	mouseUpCallback: (res) => {
		viewAction.buildList()
		const ret = viewAction.operationView(res)
		pluginMove(weipage, ret.type, ret.pluginId, ret.toPluginId)
	},
	resizeCallback: (pluginId, res) => {
		console.log(pluginId)
		if (pluginId && res) {
			const plugin = pluginSearch(weipage, pluginId)
			if (res.width && res.width > 0) {
				plugin.style.width = res.width
			}
			if (res.height && res.height > 0) {
				plugin.style.height = res.height
			}
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
			console.log(res)
			$('#file').val('')
		},
		error: function() {
			$('#file').val('')
		}
	})
})
