import '@assets/css/reset.css'
import './style.css'

var indexPage = new Vue({
	el: '#indexPage',
	data() {
		return {
			isLogin: false
		}
	},
	created: function() {
		if (document.cookie.indexOf('userIdStr') >= 0 && document.cookie.indexOf('token') >= 0) {
			this.isLogin = true
		} else {
			this.isLogin = false
		}
	}
})

// $.ajax({
// 	url: '/api/tool/chromeToWeipage',
// 	type: 'post',
// 	data: {
// 		chromeData: '{"data":"","nodeName":"BODY","style":{},"childList":[{"nodeName":"SECTION","style":{},"data":"","childList":[{"nodeName":"A","style":{},"data":"","childList":[{"nodeName":"DIV","style":{},"data":"","childList":[{"nodeName":"H3","style":{},"data":"","childList":[{"nodeName":"SPAN","style":{},"data":"多国政要声援中国，谁才是老朋友？华春莹一口气感谢11个国家","childList":[]}]},{"nodeName":"DIV","style":{},"data":"","childList":[{"nodeName":"DIV","style":{},"data":"","childList":[{"nodeName":"SPAN","style":{},"data":"","childList":[{"nodeName":"SPAN","style":{},"data":"北晚新视觉网","childList":[]}]},{"nodeName":"SPAN","style":{},"data":"","childList":[{"nodeName":"SPAN","style":{},"data":"评论 ","childList":[]},{"nodeName":"SPAN","style":{},"data":"172","childList":[]}]},{"nodeName":"SPAN","style":{},"data":"","childList":[]},{"nodeName":"SPAN","style":{},"data":"0","childList":[]}]}]}]},{"nodeName":"DIV","style":{},"data":"","childList":[{"nodeName":"IMG","style":{"width":228,"height":159},"data":"https://p3.pstatp.com/list/pgc-image/34cd6897f6a247998182088be1f09bd5","childList":[]}]}]}]}]}'
// 	},
// 	dataType: 'json',
// 	success: function(res) {
// 		console.log(res)
// 	}
// })
