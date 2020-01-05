import 'babel-polyfill'
import '@assets/css/reset.css'
import './style.css'

import '@plugin/mobile.js'

import { commonAction } from '@assets/js/commonAction.js'
import { weipageAction } from '@assets/js/weipage/weipageAction.js'
import { mobileAction } from '@assets/js/weipage/mobileAction.js'

var weipage = new Vue({
	el: '#weipage',
	data() {
		return {
			pluginList: []
		}
	},
	methods: {
		// 获取微页面详情
		getWeipageDetail(weipageId) {
			weipageAction.getWeipageDetail({
				weipageId
			}, (res) => {
				if (res.data && res.data.weipage) {
					
					// 预处理滚动事件
					if (res.data.weipage.countEvent && res.data.weipage.countEvent.eventList.length) {
						const countEventList = res.data.weipage.countEvent.eventList
						for (let i = 0; i < countEventList.length; i++) {
							mobileAction.countDataList.push({
								cardinal: countEventList[i].cardinal,
								countId: countEventList[i].countId,
								initial: countEventList[i].initial,
								rule: countEventList[i].rule,
								data: countEventList[i].initial
							})
						}
					}

					this.pluginList = res.data.pluginList

					// 深度递归解析所有响应、属性、事件
					mobileAction.parseConfigurationDataList(0, this.pluginList)

					// 结合接口详情数据统一执行处理 parseConfigurationDataList 解析出来的结果
					mobileAction.doInterfaceListAction(0, res.data.weipage.interfaceList, {}, () => {
						mobileAction.doLoadingAction()
						this.loadingEnd()
						this.scrollEvent(res.data.weipage)
					})
				}
			})
		},
		// 通用事件
		doPluginEvent(option){
			mobileAction.doPluginEvent(option.pluginId, option.indexList)
		},
		// 加载完毕才启用swiper
		loadingEnd() {
			setTimeout(() => {
				new Swiper('.swiper-container', {
					autoplay: 5000
				})
			}, 1000)
		},
		// 滚动条滚动事件
		scrollEvent(weipageData) {
			const screenHeight = isPC() ? 667 : window.screen.height
			$(window).scroll(() => {
				const scrollTop = $(window).scrollTop()
				const height = $(window).height()
				if (scrollTop <= 0) {
					mobileAction.doScrollEvent('top', weipageData.scrollEvent.eventList, () => {
						mobileAction.doLoadingAction()
					})
				} else if (scrollTop >= height - screenHeight) {
					mobileAction.doScrollEvent('bottom', weipageData.scrollEvent.eventList, () => {
						mobileAction.doLoadingAction()
					})
				}
			})
		}
	}
})


function isPC() {
    const userAgentInfo = navigator.userAgent
    const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
    let flag = true
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false
            break
        }
    }
    return flag
}

const weipageId = commonAction.getQueryString('weipageId')
if (weipageId) {
	weipage.getWeipageDetail(weipageId)
}
