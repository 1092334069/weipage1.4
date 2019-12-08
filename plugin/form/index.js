import formBaseForm from './baseForm.vue'
import formStyleForm from './styleForm.vue'

formBaseForm.install = function(Vue) {
	Vue.component(formBaseForm.name, formBaseForm)
}

formStyleForm.install = function(Vue) {
	Vue.component(formStyleForm.name, formStyleForm)
}

export default {
	formBaseForm,
	formStyleForm
}
