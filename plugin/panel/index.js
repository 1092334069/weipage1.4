import panelBaseForm from './baseForm.vue'
import panelEventForm from './eventForm.vue'

panelBaseForm.install = function(Vue) {
	Vue.component(panelBaseForm.name, panelBaseForm)
}

panelEventForm.install = function(Vue) {
	Vue.component(panelEventForm.name, panelEventForm)
}

export default {
	panelBaseForm,
	panelEventForm
}