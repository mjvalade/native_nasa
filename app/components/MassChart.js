import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Easing,
  ScrollView
} from 'react-native';

const _ = require('underscore');

export default class MassChart extends Component {
  constructor(props) {
    super(props);
    this.state={
      bounceValue: new Animated.Value(0.7)
    };
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this._animateIn();
    });
  }

  _animateIn = () => {
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: 1,
        friction: 1,
      }
    ).start(this._animateOut);
  }

  _animateOut = () => {
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: 0.8,
        friction: 1,
      }
    ).start(this._animateIn);
  };

  render() {
    let { bounceValue } = this.state;

    let meteors = this.props.meteors.toJS();
    const meteorMassList = meteors.map((meteor) => parseInt(meteor.mass));

    function findAgroup(mass) {
      if(mass <= 100) { return mass; }
    }
    function findBgroup(mass) {
      if(mass > 100 && mass <= 1000) { return mass; }
    }
    function findCgroup(mass) {
      if(mass > 1000 && mass <= 100000) { return mass; }
    }
    function findDgroup(mass) {
      if(mass > 100000 && mass <= 250000) { return mass; }
    }
    function findEgroup(mass) {
      if(mass > 250000 && mass <= 500000) { return mass; }
    }
    function findFgroup(mass) {
      if(mass > 500000 && mass <= 750000) { return mass; }
    }
    function findGgroup(mass) {
      if(mass > 750000 && mass <= 1000000) { return mass; }
    }
    function findHgroup(mass) {
      if(mass > 1000000) { return mass; }
    }

    const massListA = meteorMassList.filter(findAgroup);
    const massListB = meteorMassList.filter(findBgroup);
    const massListC = meteorMassList.filter(findCgroup);
    const massListD = meteorMassList.filter(findDgroup);
    const massListE = meteorMassList.filter(findEgroup);
    const massListF = meteorMassList.filter(findFgroup);
    const massListG = meteorMassList.filter(findGgroup);
    const massListH = meteorMassList.filter(findHgroup);

    const massGroup = [massListA, massListB, massListC, massListD, massListE, massListF, massListG, massListH];

    return(
      <ScrollView horizontal={true}>
        <View style={styles.massChart}>
          {massGroup.map(function(group, i) {
            let massHeight = group.length ? group.length : 2;
            if(group === massListH) {
              scoreColor = '#1E77E2'
            }
            if(group === massListG) {
              scoreColor = '#6A5'
            }
            if(group === massListF) {
              scoreColor = '#FED024'
            }
            if(group === massListE) {
              scoreColor = '#FA5732'
            }
            if(group === massListD) {
              scoreColor = '#C21515'
            }
            if(group === massListC) {
              scoreColor = '#8000b4'
            }
            if(group === massListB) {
              scoreColor = '#42c215'
            }
            if(group === massListA) {
              scoreColor = '#fff'
            }
            return (
              <View style={styles.yearChart} key={i}>
                <Animated.View style={[{transform: [{scale: bounceValue}], height: massHeight,backgroundColor:scoreColor}, styles.bar, styles.barPageCount]} />
              </View>
            )}
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  massChart: {
    top: 5,
    height: 500,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    margin: 1,
  },
  bar: {
    width: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    marginLeft: 2,
  },
  barPageCount: {
  }
});
