import actionForm from './actionForm.vue'
import styleForm from './styleForm.vue'

actionForm.install = function(Vue) {
	Vue.component(actionForm.name, actionForm)
}

styleForm.install = function(Vue) {
	Vue.component(styleForm.name, styleForm)
}

export default {
	actionForm,
	styleForm
}
