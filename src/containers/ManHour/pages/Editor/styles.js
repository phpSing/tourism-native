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
    backgroundColor: '#f3f3f3'
  },
  item: {
    paddingTop: 18,
    width: width,
    height: 50,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  content: {
    flexDirection: 'row'
  },
  border: {
    width: width - 20,
    marginLeft: 10,
    height: 1
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: '#999',
    paddingLeft: 10
  },
  value: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  arrow: {
    width: 15,
    height: 15,
    marginLeft: 5,
    marginRight: 5
  },
  workingHour: {
    width: 300,
    height: 20,
    marginBottom: 5,
    marginRight: 10,
    textAlign: 'right'
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
