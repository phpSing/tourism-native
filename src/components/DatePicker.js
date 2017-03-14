import React, {Component,PropTypes} from 'react';
import {
    AppRegistry,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

import Picker from 'react-native-picker';

export default class DatePicker extends Component {

    constructor(props, context) {
        super(props, context)
        this.state={
        	value:this.props.defaultValue
        }
    }

    //生成日期
    _createDateData=()=> {
    	const {startYear,endYear}=this.props
        let date = [];
        for(let i=1950;i<2050;i++){
            let month = [];
            for(let j = 1;j<13;j++){
                let day = [];
                if(j === 2){
                    for(let k=1;k<29;k++){
                        day.push(k+'日');
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if(i%4 === 0){
                        day.push(29+'日');
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        day.push(k+'日')
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        day.push(k+'日')
                    }
                }
                let _month = {}
                _month[j+'月'] = day
                month.push(_month)
            }
            let _date = {}
            _date[i+'年'] = month
            date.push(_date)
        }
        return date
    }

    //显示日期
    _showDatePicker=()=> {
    	const {dropdownlistOption}=this.props
    	dropdownlistOption.pickerData=this._createDateData()
    	dropdownlistOption.onPickerConfirm=this._dataPickerConfirm
        Picker.init(dropdownlistOption);
        Picker.show();
    }

    //选择日期的回调
    _dataPickerConfirm=(pickedValue, pickedIndex)=>{
    	const {onChange}=this.props
    	onChange(pickedValue)
    	this.setState({
    		value:pickedValue.join('')
    	})

    }

    render() {
    	const {inputStyle,width,height}=this.props
    	let style=Object.assign({},inputStyle)
    	style.width=width
    	style.height=height
        return (
	        <TouchableOpacity  onPress={this._showDatePicker}>
	          <TextInput value={this.state.value} editable={false} style={style}  />
	        </TouchableOpacity>
        );
    }
}
//startYear:开始年份
//endYear:结束年份
//defaultValue:默认值
DatePicker.propTypes = {
  onChange:PropTypes.func.isRequired,
  width:PropTypes.number,
  height:PropTypes.number,
  startYear: PropTypes.number,
  endYear: PropTypes.number,
  defaultValue: PropTypes.string,
  inputStyle:PropTypes.object,
  dropdownlistOption:PropTypes.object
}
DatePicker.defaultProps = {
  onChange:()=>{},
  width:100,
  height:40,
  startYear: 1950,
  endYear: 2020,
  disable: '',
  inputStyle:{
  	borderWidth:1,
  	borderColor:'#444444',
  	padding:5,
  	color:'#444444',
  	fontSize:14,
  	textAlign:'center'
  },
  dropdownlistOption:{ 
  	pickerToolBarFontSize: 16,
    pickerFontSize: 16,
    pickerFontColor: [44, 44 ,44, 1],
    pickerConfirmBtnText:'确定',
    pickerCancelBtnText:'取消',
    pickerTitleText:'请选择日期',
  }
}