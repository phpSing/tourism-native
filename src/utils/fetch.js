import { objToQuery } from './helper'

const config = {
  method: 'GET'
}
/**
 * fetch
 * @param  {[String]} url     [请求地址]
 * @param  {[Object]} data    [param数据]
 * @param  {[Object]} options [配置参数]
 *   e.g: [String]method, [Object]headers, [String]credentials
 * @return {[Object]}      [请求结果，暂时只支持json格式的请求]
 */
export default async (url, data, opt) => {
	const options = Object.assign({}, config, opt);
	if (options.method.toUpperCase() === 'POST') {
    options.headers = Object.assign({
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
      // "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    }, options.headers)
    options.body = JSON.stringify(data)
	} else {
	  url = (data && Object.keys(data).length > 0) ? `${url}?${objToQuery(data)}` : url
	}
	const result = await fetch(url, options)
	const json = result.json()
	return json
}
