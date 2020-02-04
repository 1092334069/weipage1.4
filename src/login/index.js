import '@assets/css/reset.css'
import './style.css'


var login = new Vue({
	el: '#login',
	data() {
		return {
			formData: {
				phone: '13651438085',
				code: '788329'
			}
		}
	},
	methods: {
		login: function() {
			$.ajax({
				url: '/api/login/phoneCode',
				type: 'get',
				data: this.formData,
				dataType: 'JSON',
				success: (res) => {
					if (res.code === 200) {
						this.$Message.success(res.message)
						window.location.href = '/index'
					} else {
						this.$Message.error(res.message)
					}
				}
			})
		}
	}
})
