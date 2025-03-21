const request = require('request')
const FormData = require('form-data')
const fs = require('fs')
const formidable = require('formidable')
const path = require("path")
const sd = require("silly-datetime")
const multiparty = require('multiparty')
const compressing = require('compressing')
const fileConfig = require('../config/fileConfig')
const sketchAction = require('./sketchAction')

// sketch上传处理
function sketchUpload(req, userIdStr, callback) {
	try {
		const form = new formidable.IncomingForm()
		form.uploadDir = `${__dirname}/${fileConfig.temporary}`
		form.parse(req, (err, fields, files) => {
			if (err) {
				callback(JSON.stringify({code: 501, message: '文件上传失败' }))
				return
			}
			if (!files.file || !files.file.name || files.file.name.lastIndexOf('.') <= 0) {
				callback(JSON.stringify({code: 502, message: '文件上传失败' }))
				return
			}
			const fName = files.file.name
			const time = sd.format(new Date(),'YYYYMMDDHHmmss')
			const extname = path.extname(fName)
			const oldPath = files.file.path
			const fileDir = `${__dirname}/${fileConfig.sketch}/`
			const folderName = `${userIdStr}_${time}`
			const fileUrl = fileDir + folderName
			const newPath = fileUrl + extname
			let fileName = fName.substring(0, fName.lastIndexOf('.'))
			fs.rename(oldPath, newPath, (err) => {
				if (err) {
					callback(JSON.stringify({code: 503, message: '文件上传失败' }))
					return
				}
				compressing.zip.uncompress(newPath, fileUrl).then(() => {
					sketchAction.getLayerDir(folderName, callback)
					fs.unlink(newPath, (err) => {
						if (err) {
							console.log(err)
						}
					})
				}).catch(err => {
					if (err) {
						console.error(err)
					}
					callback(JSON.stringify({code: 504, message: '文件上传失败' }))
				})
			})
		})
	} catch (err) {
		if (err) {
			console.error(err)
		}
		callback(JSON.stringify({code: 500, message: '文件上传失败' }))
	}
}

function fileUpload(req, callback) {
	const form = new multiparty.Form()
	form.parse(req, function (err, fields, files) {
		if (!files) {
			callback(JSON.stringify({code: 500, message: '文件上传失败' }))
			return
		}
		if(files.file && files.file.length) {
			const file = files.file[0]
			request.post({
				url: 'http://8.129.1.232/api/common/upload',
				formData: {
					file: fs.createReadStream(file.path),
				},
			}, (error, response, body) => {
				if (error) {
					callback(JSON.stringify({code: 501, message: '文件上传失败' }))
					return
				}
				callback(body)
			})
		}
	})
}


module.exports = {
	sketchUpload,
	fileUpload
}