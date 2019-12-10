import formBaseForm from './baseForm.vue'

formBaseForm.install = function(Vue) {
	Vue.component(formBaseForm.name, formBaseForm)
}

export default {
	formBaseForm
}
