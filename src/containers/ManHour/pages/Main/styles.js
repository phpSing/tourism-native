import {
  Dimensions,
  StyleSheet
} from 'react-native'

var width = Dimensions.get('window').width

const styles = StyleSheet.create({
  navigatorText: {
    color: '#444444',
    width: 60,
    height: 20,
    textAlign: 'right',
    marginLeft: 5
  },
  navigatorIcon :{
    width: 14.4,
    height: 8.4,
    marginTop: -23
  }
})

export default styles
