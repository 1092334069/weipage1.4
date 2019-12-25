import formTree from './formTree.vue'
import pluginTree from './pluginTree.vue'
import interfaceTree from './interfaceTree.vue'
import interfaceChildTree from './interfaceChildTree.vue'
import styleSelector from './styleSelector.vue'
import imageSelector from './imageSelector.vue'
import imageUpload from './imageUpload.vue'
import inputSource from './inputSource.vue'
import editForm from './editForm.vue'
import weipageForm from './weipageForm.vue'

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

imageSelector.install = function(Vue) {
	Vue.component(imageSelector.name, imageSelector)
}

imageUpload.install = function(Vue) {
	Vue.component(imageUpload.name, imageUpload)
}

inputSource.install = function(Vue) {
	Vue.component(inputSource.name, inputSource)
}

editForm.install = function(Vue) {
	Vue.component(editForm.name, editForm)
}

weipageForm.install = function(Vue) {
	Vue.component(weipageForm.name, weipageForm)
}

Vue.use(formTree)
Vue.use(pluginTree)
Vue.use(interfaceTree)
Vue.use(interfaceChildTree)
Vue.use(styleSelector)
Vue.use(imageSelector)
Vue.use(imageUpload)
Vue.use(inputSource)
Vue.use(editForm)
Vue.use(weipageForm)
