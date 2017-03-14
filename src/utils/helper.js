import { isObject, isString } from './validate.js';

/**
* [解析url中的search, 将search由字符串变成对象]
* @return {Object}
*/
const queryObj = () => {
	const query = location.search.split('?')[1]
	const obj = {}
	if (query) {
		const arr = query.split('&')
		arr.forEach((item, index, array) => {
			const itemArr = item.split('=')
			obj[itemArr[0]] = decodeURIComponent(itemArr[1])
		})
	}
	return obj
}

/**
* [查找url中search特定key的value值]
* @param  {String} key [特定的key]
* @return {String}     [特定key的value]
*/
const queryString = (key) => {
	if (!isString(key)) {
		return ''
	}
	const obj = queryObj()
	return obj[key]
}

/**
* [对queryObj的逆向操作。将query对象变成search字符串]
* @param  {Object} obj [处理的目标对象]
* @return {String}     [search字符串]
*/
const objToQuery = (obj) => {
	if (!isObject(obj)) {
		return ''
	}

	let arr = []
	Object.keys(obj).forEach((item, index, array) => {
		arr.push(`${item}=${obj[item]}`)
	})

	return arr.join('&')
}

export {
	queryObj,
	queryString,
	objToQuery
}
