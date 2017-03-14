import {
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3'
  },
  queryFactor: {
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  textAlignRight: {
    textAlign: 'right'
  },
  factor: {
    height: 50,
    borderStyle: 'solid',
    borderBottomColor: '#ccc',
    borderBottomWidth: .5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  factorBorderNone: {
    borderBottomWidth: 0
  },
  factorLabel: {
    flex: 1
  },
  factorLabelText: {
    fontSize: 15,
    color: '#333'
  },
  factorContent: {
    flex: 5
  },
  fantorContentText: {
    paddingRight: 35,
    fontSize: 15,
    color: '#999',
    textAlign: 'right'
  },
  factorDatePicker: {
    position: 'absolute',
    top: -10,
    right: 0,
    opacity: 0
  },
  factorContentIcon: {
    position: 'absolute',
    top: 0,
    width: 15,
    height: 15
  },
  factorContentIcon1: {
    right: 15
  },
  factorContentIcon2: {
    right: 0
  },
  detailWrap: {
    marginTop: 10,
    backgroundColor: '#fff'
  },
  detailTitle: {
    height: 50,
    paddingHorizontal: 10,
    borderStyle: 'solid',
    borderBottomColor: '#ccc',
    borderBottomWidth: .5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  detailTitleContent: {
    flex: 1,
    paddingLeft: 10,
    borderStyle: 'solid',
    borderLeftColor: '#f92a8a',
    borderLeftWidth: 1.5
  },
  detailTitleText: {
    fontSize: 15,
    color: '#333'
  },
  detailTitleIcon: {
    flex: 2
  },
  detailTitleIconContent: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 15,
    height: 15
  },
  detailContent: {
    paddingHorizontal: 10,
    borderStyle: 'solid',
    borderBottomColor: '#ccc',
    borderBottomWidth: .5
  },
  detailContentTitle: {
    height: 45,
    borderStyle: 'solid',
    borderBottomColor: '#ccc',
    borderBottomWidth: .5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  detailContentTitleLabel: {
    flex: 1,
    fontSize: 14,
    color: '#333'
  },
  detailContentTitleNormal: {
    color: '#999'
  },
  detailContentTitleStrong: {
    color: '#f92a8a'
  },
  detailContentList: {
    paddingTop: 15,
    paddingBottom: 20
  },
  detailContentListText: {
    fontSize: 14,
    color: '#999'
  },
  detailContentButtonWrap: {
    height: 60
  },
  detailContentButton: {
    position: 'absolute',
    right: 60,
    top: 15,
    width: 50,
    height: 30,
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderWidth: .5
  },
  detailContentDelete: {
    right: 0
  },
  detailContentButtonText: {
    lineHeight: 28,
    textAlign: 'center'
  },
  saveButton: {
    height: 49,
    marginTop: 22.5,
    backgroundColor: '#f92a8a'
  },
  saveButtonText: {
    fontSize: 17,
    lineHeight: 49,
    color: '#fff',
    textAlign: 'center'
  }
})

export default styles
