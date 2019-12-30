const pluginConfig = {
	panel: {
		pluginType: 'panel',
		base: {
			name: '面板',
			data: '',
			type: 'normal',
			actionList: [],
			attrList: []
		},
		style: {
			width: 375,
			height: 80,
			backgroundColor: '#ffffff'
		},
		event: {
			eventList: []
		},
		pluginList: []
	},
	text: {
		pluginType: 'text',
		base: {
			name: '文本',
			data: '',
			actionList: []
		},
		style: {
			
		}
	},
	image: {
		pluginType: 'image',
		base: {
			name: '图片',
			data: '',
			actionList: []
		},
		style: {
			width: 100,
			height: 100
		}
	},
	form: {
		pluginType: 'form',
		base: {
			name: '表单',
			data: '',
			type: 'text',
			key: '',
			actionList: [],
			optionList: []
		},
		style: {
			width: 375,
			height: 40
		}
	}
}

module.exports = pluginConfig
