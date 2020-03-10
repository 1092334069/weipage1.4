const http = require('http')
const querystring = require('querystring')

function httpGet(hostname, port, parameter, callback) {
	let postData = querystring.stringify(parameter.param)
	let options = {
		hostname,
		port,
		path: parameter.pathname + '?' + postData,
		method: 'GET',
		headers: {
			'Content-Type':parameter.req.headers['content-type'] || 'application/x-www-form-urlencoded; charset=UTF-8', 
			'User-Agent': parameter.req.headers['user-agent']
		}
	}
	let rqt = http.request(options, (res) => {
		let backData = ''
		res.setEncoding('utf-8');  
		res.on('data', (chun) => {
			backData += chun
		})
		res.on('end', (end) => {
			callback(backData)
		})
	})
	rqt.on('error', (err) => {
		callback({code: 502, message: '网络异常，请稍后重试' })
	})
	rqt.end()
}

function httpPost(hostname, port, parameter, callback){
	let postData = querystring.stringify(parameter.param)
	// if (parameter.req.headers['content-type'].indexOf('application/json') >= 0) {
	// 	postData = parameter.param
	// } else if (parameter.req.headers['content-type'].indexOf('multipart/form-data') >= 0) {
	// 	postData = parameter.param
	// }  else {
	// 	postData = querystring.stringify(parameter.param)
	// }
	let options = {
		hostname,
		port,
		path: parameter.pathname,
		method: 'POST',
		headers: {
			'Content-Type':parameter.req.headers['content-type'] || 'application/x-www-form-urlencoded; charset=UTF-8',
			'User-Agent': parameter.req.headers['user-agent']
		}
	}
	let rqt = http.request(options, (res) => {
	let backData = ''
		res.setEncoding('utf-8')
		res.on('data', (chun) => {
			backData += chun
		})
		res.on('end', (end) => {
			callback(backData)
		})
	})
	rqt.on('error', (err) => {
		console.log(err)
		callback({code: 502, message: '网络异常，请稍后重试' })
	})
	if (parameter.req.headers['content-type'].indexOf('multipart/form-data') >= 0) {
		postData.pipe(rqt)
	} else {
		rqt.write(postData)
		rqt.end()
	}
}

function serverRequest(parameter, callback) {
	const apiHttpUrl = '119.23.230.249'
	const port = 9090
	if (parameter.method === 'POST') {
		httpPost(apiHttpUrl, port, parameter, callback)
	} else {
		httpGet(apiHttpUrl, port, parameter, callback)
	}
}

function javaServerRequest(parameter, callback) {
	const apiHttpUrl = '8.129.1.232'
	const port = 80
	if (parameter.method === 'POST') {
		httpPost(apiHttpUrl, port, parameter, (res) => {
			callback(res)
		})
	} else {
		httpGet(apiHttpUrl, port, parameter, callback)
	}
}

module.exports = {
	serverRequest,
	javaServerRequest
}