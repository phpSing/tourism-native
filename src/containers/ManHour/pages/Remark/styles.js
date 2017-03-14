import {
  Dimensions,
  StyleSheet
} from 'react-native'

var width = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  txt: {
    width: width,
    padding: 5,
    height: 300,
    marginTop: 10,
    backgroundColor: '#fff',
    fontSize:18
  },
  save: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 49,
    backgroundColor: '#f92a8a',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 49,
    color: '#fff'
  }
})
export default styles
