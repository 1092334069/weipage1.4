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
