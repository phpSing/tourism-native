import Immutable from 'seamless-immutable'
import React, { Component } from 'react'
import { Router, Scene, Actions } from 'react-native-router-flux'
import { Provider } from 'react-redux'

import configureStore from '../../configureStore'
import initialState from './state'
import reducer from './reducers'
import Main from './pages/Main'
import Detail from './pages/Detail'
import Editor from './pages/Editor'
import Remark from './pages/Remark'

const store = configureStore(initialState, reducer)

//require 图片只引用一次
//定义一个style，复用
//样式格式和24行保持一致
export default class Root extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      backIcon:require('./assets/back.png'),
      barStyle:{ paddingTop : 64 } 
    };
  }

  render() {
    const { backIcon, barStyle } = this.state
    const store = configureStore(Immutable.merge(initialState, { query: this.props }), reducer)
    return (
      <Provider store={store}>
        <Router sceneStyle={{ backgroundColor: 'white' }}>
          <Scene key='root'
            leftButtonImage={backIcon}
            backButtonImage={backIcon}
            leftButtonIconStyle={ { width: 20, height: 20 } }
            navigationBarStyle={ {backgroundColor: '#fff', marginBottom: 40 } }
            titleStyle={ {fontSize: 17 } }
          >
            <Scene
              key='Main'
              component={Main}
              type='push'
              title="我的工时"
              style={barStyle}
              initial
            />
            <Scene
              key='Editor'
              component={Editor}
              style={barStyle}
              title="填报工时"
              
            />
            <Scene
              key='Remark'
              component={Remark}
              style={barStyle}
              title="备注"
            />
            <Scene
              key='Detail'
              component={Detail}
              style={barStyle}
              title="填报工时"
            />
          </Scene>
        </Router>
      </Provider>
    )
  }
}
