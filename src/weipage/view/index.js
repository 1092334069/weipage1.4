import 'babel-polyfill'
import '../../../assets/css/reset.css'
import './style.css'

import { commonAction } from '../../../assets/js/commonAction.js'

const weipageId = commonAction.getQueryString('weipageId')
if (weipageId) {
	$('#weipageView').attr('src', `/weipage/mobile?weipageId=${weipageId}`)
}