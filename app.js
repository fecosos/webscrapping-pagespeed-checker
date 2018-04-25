const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const testArr = require('./sites-to-test')
// const path = require('path').basename(__dirname)
var jsonfile = require('jsonfile')




// axios.get('http://www.abproject.com.ar/es/')


let promises = []

testArr.forEach((e,i) => {
	promises.push(
		axios.get(e)
			.then(res => {
				if (res.status == 200) {
					// const html = res.data
					// const $ = cheerio.load(html)
					// const keys = Object.keys(res)
					const headers = res.headers
					const pageSpeed = headers['x-mod-pagespeed']
					const stringHeaders = JSON.stringify(headers)
					// console.log(pageSpeed)
					return { "page": e, "pagespeed-version": pageSpeed ? pageSpeed : "undefined"   }
				}
			})
			.catch(err => {throw err})
	)
})

// setTimeout(()=>{
// 	console.log('hola')
// 	console.log(result)
// },2000)
Promise.all(promises)
	.then(result => {
		jsonfile.writeFile('./result.json', {result: result}, err => console.log(err))
	})
