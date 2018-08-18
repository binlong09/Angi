import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';
import * as actions from '../actions';
import { Button, Icon, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';

class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="flight" size={30} color={tintColor} />;
    }
  }

  state = {
    mapLoaded: false,
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09
    }
  }

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  // callback function so = () =>
  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  onButtonPress = () => {
    this.props.fetchJobs(this.state.region, () => {
      this.props.navigation.navigate('deck');
    });
  }

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>

        <MapView
          region={this.state.region}
          style={{ flex: 1 }} 
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
          <SearchBar
            placeholder="Tìm gì đi bạn"
            round={true}
            containerStyle={styles.buttonTopContainer}
            cancelButtonTitle="Xoá"
          />
        <View style={styles.buttonBottomContainer}>
          <Button 
            large
            title="Tìm Vùng Này"
            backgroundColor="#009688"
            icon={{ name: 'search' }}
            onPress={this.onButtonPress}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  buttonTopContainer: {
    position: 'absolute',
    top: 30,
    left: 20,
    right: 20,
  },
  buttonBottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  }
}

export default connect(null, actions)(MapScreen);