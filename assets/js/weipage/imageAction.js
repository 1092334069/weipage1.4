/*
*	图片公共工具方法
*/
class ImageAction {
	constructor() {
		this.weiPageThis = undefined
	}
	init(that) {
		this.weiPageThis = that
	}
	getImageList() {
		const _this = this
		$.ajax({
			url: '/api/common/upload/list',
			type: 'get',
			data: {
				page: _this.weiPageThis.imageTabelData.page,
				pageSize: _this.weiPageThis.imageTabelData.size
			},
			dataType: 'json',
			success: (res) => {
				if (res && res.code === 200 && res.data) {
					_this.weiPageThis.imageTabelData.list = res.data.list
					_this.weiPageThis.imageTabelData.total = res.data.pagination.totalCount
				}
			}
		})
	}
	uploadImage() {

	}
	addImage() {

	}
	deleteImage() {

	}
}

const imageAction = new ImageAction()

export {
	imageAction
}
