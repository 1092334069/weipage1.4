import formTree from './formTree.vue'
import pluginTree from './pluginTree.vue'
import interfaceTree from './interfaceTree.vue'
import interfaceChildTree from './interfaceChildTree.vue'
import styleSelector from './styleSelector.vue'

formTree.install = function(Vue) {
	Vue.component(formTree.name, formTree)
}

pluginTree.install = function(Vue) {
	Vue.component(pluginTree.name, pluginTree)
}

interfaceTree.install = function(Vue) {
	Vue.component(interfaceTree.name, interfaceTree)
}

interfaceChildTree.install = function(Vue) {
	Vue.component(interfaceChildTree.name, interfaceChildTree)
}

styleSelector.install = function(Vue) {
	Vue.component(styleSelector.name, styleSelector)
}

Vue.use(formTree)
Vue.use(pluginTree)
Vue.use(interfaceTree)
Vue.use(interfaceChildTree)
Vue.use(styleSelector)
