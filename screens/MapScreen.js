import React, { Component } from 'React';
import { View, Text, ActivityIndicator } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import * as actions from '../actions';
import { Button, Icon, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';

class MapScreen extends Component {
  async UNSAFE_componentWillMount() {
    await this._getLocationAsync();
  }

  static navigationOptions = {
    title: 'Map',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="flight" size={30} color={tintColor} />;
    }
  }

  state = {
    mapLoaded: false,
    region: null,
    errorMessage: ""
  }

  async componentDidMount() {
    this.setState({ mapLoaded: true });
    console.log(this.state)
  }

  // callback function so = () =>
  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  onButtonPress = () => {
    this.props.fetchFoods(this.state.region, () => {
      this.props.navigation.navigate('deck');
    });
  }

  _getLocationAsync = async () => {
    console.log("called: ", this.state.region)
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        longitudeDelta: 0.006759003698505239,
        latitudeDelta: 0.01006056948800449
      }
     })
     console.log(this.state.region)
  };

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
          showLoading={true}
          onRegionChangeComplete={this.onRegionChangeComplete}
          // liteMode
        />
        <SearchBar
          placeholder="Kéo bản đồ hoặc tìm ở đây"
          containerStyle={styles.buttonTopContainer}
          cancelButtonTitle="Xoá"
        />
        <View style={styles.buttonHomeContainer}>
          <Button
            small
            title="home"
            icon={{ name: 'home' }}
            onPress={this._getLocationAsync}
          />
        </View>
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
  buttonHomeContainer: {
    flex: 1,
    position: 'absolute'
  },
  buttonBottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  }
}

export default connect(null, actions)(MapScreen);