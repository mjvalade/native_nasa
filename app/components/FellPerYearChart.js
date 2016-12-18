import React, { Component } from 'react';
const _ = require('underscore');
const moment = require('moment');

import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Easing
} from 'react-native';

export default class FellPerYearChart extends Component{
  constructor (props) {
   super(props);
   this.state = {
     bounceValue: new Animated.Value(0.7)
   };
  }

 // componentDidMount() {
 //   requestAnimationFrame(() => {
 //  			this._animateIn();
 //    });
 //  }

  // _animateIn = () => {
  //   Animated.spring(
  //     this.state.bounceValue,
  //     {
  //       toValue: 1,
  //       friction: 1,
  //     }
  //   ).start(this._animateOut);
  // }

  // _animateOut = () => {
  //   Animated.spring(
  //     this.state.bounceValue,
  //     {
  //       toValue: 0.8,
  //       friction: 1,
  //     }
  //   ).start(this._animateIn);
  // };

 render() {
   function findFirstBatch(year) {
     if(year <= 1850) { return year; }
   }
   function findSecondBatch(year) {
     if(year > 1850 && year <= 1900) { return year; }
   }
   function findThirdBatch(year) {
     if(year > 1900 && year <= 1950) { return year; }
   }
   function findFourthBatch(year) {
     if(year > 1950 && year <= 2000) { return year; }
   }
   function findFifthBatch(year) {
     if(year > 2000) { return year; }
   }

   let { bounceValue } = this.state;
   const meteorYearList = this.props.meteors.map((meteor) => meteor.year);
   const meteorsByYear = _.sortBy(meteorYearList);
   const formatedYears = meteorsByYear.map((year) => {return parseInt(moment(year).format('YYYY'));});

   const groupYear1stBatch = formatedYears.filter(findFirstBatch);
   const groupYear2ndBatch = formatedYears.filter(findSecondBatch);
   const groupYear3rdBatch = formatedYears.filter(findThirdBatch);
   const groupYear4thBatch = formatedYears.filter(findFourthBatch);
   const groupYear5thBatch = formatedYears.filter(findFifthBatch);

   const groupedArray = [groupYear1stBatch, groupYear2ndBatch, groupYear3rdBatch, groupYear4thBatch, groupYear5thBatch];

   return (
     <View style={styles.yearChart}>
     {groupedArray.map(function(group, i) {
       let yearCountHeight = group.length ? group.length : 0;
       if(group === groupYear1stBatch) {
         scoreColor = '#1E77E2'
       }
       if(group === groupYear2ndBatch) {
         scoreColor = '#6A5'
       }
       if(group === groupYear3rdBatch) {
         scoreColor = '#FED024'
       }
       if(group === groupYear4thBatch) {
         scoreColor = '#FA5732'
       }
       if(group === groupYear5thBatch) {
         scoreColor = '#C21515'
       }
       return (
         <View style={styles.yearChart} key={i}>
          <View style={[{height: yearCountHeight,backgroundColor:scoreColor}, styles.bar, styles.barPageCount]} >
          </View>
         </View>
       )}
      )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  yearChart: {
    top: 10,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 1,
  },
  bar: {
    width: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginLeft: 2,
  },
  barPageCount: {
  },
  text: {
    color: 'yellow',
  }
});