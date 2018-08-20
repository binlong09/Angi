import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  View,
} from 'react-native';

const CCard = ({ style, children }) => (
  <View style={style} >
    {children}
  </View>);

CCard.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
  onSwipedLeft: PropTypes.func,
  onSwipedRight:PropTypes.func,
  onSwipedTop: PropTypes.func,
  onSwipedBottom: PropTypes.func,
  onSwiped: PropTypes.func,
}
CCard.defaultProps = {
  style:{},
  onSwiped: () => {},
  onSwipedLeft: () => {},
  onSwipedRight: () => {},
  onSwipedTop: () => {},
  onSwipedBottom: () => {},
}

export default CCard;