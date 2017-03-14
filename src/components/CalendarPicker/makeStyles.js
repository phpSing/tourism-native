/**
 * Calendar Picker Component
 *
 * Copyright 2016 Yahoo Inc.
 * Licensed under the terms of the MIT license. See LICENSE file in the project root for terms.
 */
'use strict';

import {  Dimensions } from 'react-native';
var width = Dimensions.get('window').width
function makeStyles(scaler) {
  return {
    calendar: {
      width:width,
      height: 320*scaler
    },
    /*定义每一天的样式的地方*/
    dayWrapper: {
      width: (width/7)*scaler,
      height: 60*scaler,
      backgroundColor: 'rgba(0,0,0,0.0)'
    },

    dayButton: {
      width: 50*scaler,
      height: 40*scaler,
      alignSelf: 'center'
    },

    dayButtonSelected: {
      width: 30*scaler,
      height: 30*scaler,
      borderRadius: 15*scaler,
      backgroundColor: '#5ce600',
      alignSelf: 'center'
    },

    dayLabel: {
      fontSize: 15*scaler,
      color: '#444',
      marginTop: 6*scaler,
      alignSelf: 'center'
    },

    /*包裹星期的容器*/
    dayLabelsWrapper: {
      width:width,
      flexDirection: 'row',
      marginBottom: 10*scaler,
      height:40,
      paddingTop: 10*scaler,
      paddingBottom: 10*scaler,
      alignSelf: 'center',
      backgroundColor: '#f3f3f3',
      borderColor: 'rgba(0,0,0,0.2)'
    },

    daysWrapper: {
      width:width,
      alignSelf: 'center'
    },
    /*星期上的文字*/
    dayLabels: {
      width: (width/7)*scaler,
      fontSize: 15*scaler,
      color: '#000',
      textAlign: 'center',
      borderColor: '#f00',
      borderStyle:'solid',
      borderRightWidth:1
    },

    selectedDay: {
      width: 60*scaler,
      height:60*scaler,
      backgroundColor: '#5ce600',
      borderRadius: 30*scaler,
      alignSelf: 'center'
    },

    monthLabel: {
      fontSize: 16*scaler,
      color: '#000',
      width: 180*scaler,
      textAlign: 'center'
    },

    headerWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      alignSelf: 'center',
      marginBottom: 10*scaler,
      padding: 5*scaler,
      paddingBottom: 3*scaler,
      backgroundColor: 'rgba(0,0,0,0.0)'
    },

    monthSelector: {
      width: 80*scaler
    },

    prev: {
      textAlign: 'left',
      fontSize: 14*scaler
    },

    next: {
      textAlign: 'right',
      fontSize: 14*scaler
    },

    yearLabel: {
      fontSize: 14*scaler,
      fontWeight: 'bold',
      color: '#000',
      textAlign: 'center'
    },

    weeks: {
      flexDirection: 'column'
    },

    weekRow: {
      flexDirection: 'row'
    },

    disabledTextColor: {
      color: '#BBBBBB'
    },
    greenColor:{
      color:'#77c425'
    },
    redColor:{
      color:'#ff397e'
    },
    customText:{
      backgroundColor:'transparent',
      textAlign:'center',
      marginTop:10
    }
  };
}


module.exports = makeStyles;