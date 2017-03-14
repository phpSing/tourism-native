import Immutable from 'seamless-immutable'

export default Immutable({
  hourList: [], //列表页到详情页，用来显示工时详情
  temp: {
    hourDate: '', //新增到详情页，用来暂时存储日期数据
    hourAdress: '', //新增到详情页，用来暂时存储地址数据
    hourList: [] //新增到详情页，用来暂时存储列表数据
  },
  //total: 1,
  isFetching: false,
  manHourListInfo: {
    today: 0,
    days: 0,
    list: []
  },
  //detail: {},
  dropdownlist: {},
  isModify: false,//是否已经修改过，即editor页面是否点过保存
  address: ''
})
