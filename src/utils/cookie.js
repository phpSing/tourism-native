import CookieManager from 'react-native-cookies'

export function cookieSet(name, value) {
  console.log('cookie set name: ', name)
  console.log('cookie set value: ', value)

  CookieManager.set({
    name,
    value,
    domain: '.haiziwang.com',
    origin: '',
    path: '/',
    version: '1.0',
    expiration: '2018-05-30T12:30:00.00-05:00'
  }, (err, res) => {
    console.log('cookie set!')
    console.log(err)
    console.log(res)
  })
}