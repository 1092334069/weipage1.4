import textBaseForm from './baseForm.vue'

textBaseForm.install = function(Vue) {
	Vue.component(textBaseForm.name, textBaseForm)
}

export default {
	textBaseForm
}