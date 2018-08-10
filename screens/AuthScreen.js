import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions'; // Thanks to index.js file

class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin(); // async
    this.onAuthComplete(this.props); // very likely to never be called
  }

  // called when a component is just about to be rerendered
  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('map');
    }
  }
  
  render() {
    return (
      <View />
    );
  }
}

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);