console.disableYellowBox = true
import { AppRegistry } from 'react-native'


import Tutorial from './src/containers/Tutorial'

AppRegistry.registerComponent('tourismapp', () => Tutorial)


// AppRegistry.registerComponent('Tutorial', () => Tutorial)
// 注册的模块名 'Tutorial', 对应拦截器中moduleName

// APP拦截器
// cmd=reactnative&moduleRoot=XXX&moduleName=YYY&rnTitle=ZZZ&rnHideNavigationBar=false
// 参数说明
// moduleRoot: js bundle名称
// moduleName: 页面container, 通过AppRegistry注册
// rnTitle: 页面标题
// rnHideNavigationBar: 是否隐藏导航条
