/**
 * 验证器工具
 */

const _argsTag = '[object Arguments]'
const _boolTag = '[object Boolean]'
const _dateTag = '[object Date]'
const _funcTag = '[object Function]'
const _numberTag = '[object Number]'
const _objectTag = '[object Object]'
const _regexpTag = '[object RegExp]'
const _arrayTag = '[object Array]'
const _stringTag = '[object String]'

/**
 * @private
 * [JS类型检测]
 * @param  {[Any]} arg [任何类型]
 * @return {[String]}     [arg toString后的类型展示]
 */
const _toStr = (arg) => {
	if(arg === undefined){
		return undefined
	}
	return Object.prototype.toString.call(arg)
}

/**
 * [具体类型检测]
 * @param  {[Any]} arg [任何类型]
 * @return {[Boolean]}     [判断是否匹配当前的类型定义]
 */
const isArguments = (arg) => {
	return _toStr(arg) === _argsTag
}

const isBoolean = (arg) => {
	return _toStr(arg) === _boolTag
}

const isDate = (arg) => {
	return _toStr(arg) === _dateTag
}

const isFunction = (arg) => {
	return _toStr(arg) === _funcTag
}

const isNumber = (arg) => {
	return _toStr(arg) === _numberTag
}

const isObject = (arg) => {
	return _toStr(arg) === _objectTag
}

const isRegExp = (arg) => {
	return _toStr(arg) === _regexpTag
}

const isArray = (arg) => {
	if(Array.isArray){
		return Array.isArray(arg)
	}else{
		return _toStr(arg) === _arrayTag
	}
}

const isString = (arg) => {
	return _toStr(arg) === _stringTag
}


/**
 * [身份证号码校验]
 * @param  {[String]} id [身份证号码]
 * @return {[Boolean]}     [符合规则返回ture，否在false]
 */
const isIdCard = (id) => {
	const code = id.toString().toUpperCase()
	// 验证格式
	if(!isString(id) && !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
		return false
	}

	const city = {11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"}
	const codeArr = code.split('')

	// 验证前2位
	if(!city[code.substr(0,2)]){
		return false
	}

	// 验证最后一位
	if(codeArr.length === 18){
		// ∑(ai×Wi)(mod 11)
		// 加权因子
		const factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
		// 校验位
		const parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ]
		let sum = 0
		let ai = 0
		let wi = 0
		for (let i = 0; i < 17; i++){
			ai = code[i]
			wi = factor[i]
			sum += ai * wi
		}

		return parity[sum % 11] === code[17] ? true : false

	}else{
		return false
	}

}

/**
 * [手机号码校验]
 * @param  {[Number/"Number"]} phoneNum [手机号码]
 * @return {[Boolean]}     [符合规则返回ture，否在false]
 */
const isPhoneNum = (phoneNum) => {
	return /^1\d{10}$/g.test(phoneNum)
}



export {
	isArguments,
	isBoolean,
	isDate,
	isFunction,
	isNumber,
	isObject,
	isRegExp,
	isArray,
	isString,
	isIdCard,
	isPhoneNum
}
