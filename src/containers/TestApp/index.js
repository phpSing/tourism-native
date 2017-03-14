
import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
    Platform,
    Text } from 'react-native'
/**
 * ### Router-Flux
 *
 * Necessary components from Router-Flux
 */
import {
     Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux'


/**
 * ### Redux
 *
 * ```Provider``` will tie the React-Native to the Redux store
 */
import {
    Provider,
    connect,} from 'react-redux'

/**
 * ### configureStore
 *
 *  ```configureStore``` will connect the ```reducers```, the
 *
 */
import configureStore from '../../configureStore'
/**
 * ## States
 * Renke explicitly defines initial state
 *
 */
import initialState from './state'
// reducer
import reducer from './reducers'

import PageOne from './pages/PageOne'
import PageTwo from './pages/PageTwo'
import Page3 from './pages/Page3'

const store = configureStore(initialState, reducer)

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        return defaultReducer(state, action);
    }
};

let iconSets = {

    renke: require('./assets/icon_renke.png'),
    renkeSelected: require('./assets/icon_renke_click.png'),

}


class TabIcon extends React.Component {
    render(){
        return (

          <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center'}}>

                <Image source={iconSets.renke} style={ styles.iconStyle }></Image>

          </View>
        );
    }
}

class rootElement extends Component {

  componentDidMount() {
    // Actions.PageTwo({
    //   type: 'push'
    // })

  }

  componentDidUpdate() {
    console.log('updated');
  }

  render() {
    console.log(this);
    return (

      <Provider store={store}>

        <Router createReducer={reducerCreate} sceneStyle={{ backgroundColor: 'white' }}  type='push'>

          <Scene key='root'>

            <Scene key='PageOne'
              direction="vertical"
              component={PageOne} />

            <Scene key='PageTwo'
              direction="vertical"
              component={PageTwo} />

            <Scene key='Page3'
              direction="vertical"
              initial
              component={Page3} />
              {/*
              <Scene key='Tabbar'
                tabs
                tabBarStyle={styles.tabBar}
                default='Main'>

                <Scene key='Main'
                  title={'首页'}
                  icon={TabIcon}
                  iconName={"shouye"}
                  hideNavBar
                  initial
                  component={Main} />

                <Scene key='Functions'
                  title={'人客合一'}
                  icon={TabIcon}
                  iconName={"renke"}
                  hideNavBar
                  component={Main} />

                <Scene key='Wikis'
                  title={'知识库'}
                  iconName={"zhishiku"}
                  icon={TabIcon}
                  hideNavBar
                  component={Wikis} />

                <Scene key='My'
                  title={'我的'}
                  icon={TabIcon}
                  iconName={"mine"}
                  hideNavBar
                  component={Wikis} />

              </Scene> */}

          </Scene>

        </Router>

      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    borderTopWidth : .5,
    borderColor    : '#b7b7b7',
    backgroundColor: 'white',
    opacity        : 1,
    height: 70,
    width: 375,
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
  iconStyle: {
      height: 49,
      width: 93
  },
});

export default rootElement
