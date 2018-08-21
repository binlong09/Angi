import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Saved Foods",
    headerRight: (
      <Button
        title="Settings"
        onPress={() => { navigation.navigate('settings'); }}
        backgroundColor="rgba(0,0,0,0)"
        color="rgba(0, 122, 255 , 1)"
      />
    ),
    style: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  });

  renderLikedFoods() {
    console.log(this.props.likedFoods)
    return this.props.likedFoods.map(food => {
      const { 
        AvgRatingText, TotalReviews, Distance, Address,
        Longitude, Latitude, id, Name
      } = food;
      const initialRegion = {
        longitude: Longitude,
        latitude: Latitude,
        latitudeDelta: 0.0009162711809089785,
        longitudeDelta: 0.0006155789920399002
      };
      const coordinate = {
        longitude: Longitude,
        latitude: Latitude
      }

      return (
        <Card title={Name} key={id}>
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS == 'android'}
              scrollEnabled={true}
              initialRegion={initialRegion}
            >
              <MapView.Marker
                coordinate={coordinate}
                title={Name}
                description={Address}
              />
            </MapView>
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{AvgRatingText}/10 trong {TotalReviews} đánh giá</Text>
              <View style={{ flexDirection: 'row' }} >
                <Icon name="location-on" size={15} />
                <Text>{Distance.toFixed(1)}km</Text>
              </View>
            </View>
            <Button
              title="Apply Now!"
              backgroundColor="#03A9F4"
              // onPress={() => Linking.openURL(url)}
            />
          </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderLikedFoods()}
      </ScrollView>
    );
  }
}

const styles = { 
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  italics: {
    fontStyle: 'italic'
  }
}

function mapStateToProps(state) {
  console.log(state);
  return { likedFoods: state.likedFoods };
}

export default connect(mapStateToProps)(ReviewScreen);