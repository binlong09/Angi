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
    console.log("I'm here at",this.props.likedFoods)
    return this.props.likedFoods.map(food => {
      const { 
        AvgRatingText, TotalReviews, Distance, Address,
        Longitude, Latitude, Id, Name, Url
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

      const url = "https://www.foody.vn/".concat(Url)
      console.log(url)

      return (
        <Card title={Name} key={Id}>
          <View style={{ height: 300 }}>
            {Longitude == null ?
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.noMap}>Không thể hiển thị bản đồ</Text>
                <Text style={styles.noMap}>Không có toạ độ</Text>
              </View>
              :
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
            }
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{AvgRatingText}/10 trong {TotalReviews} đánh giá</Text>
              <View style={{ flexDirection: 'row' }} >
                <Icon name="location-on" size={15} />
                <Text>{Distance.toFixed(1)}km</Text>
              </View>
            </View>
            <View style={styles.buttonStyle}>
              <Button
                title="Xem!"
                backgroundColor="#03A9F4"
                onPress={() => Linking.openURL(url)}
                containerStyle={{ flex: 1 }}
              />
              <Button
                title="Delivery!"
                backgroundColor="#03A9F4"
                onPress={() => Linking.openURL(url)}
                containerStyle={{ flex: 1 }}
              />  
            </View>            
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
  },
  noMap: {
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  buttonStyle: {
    flexDirection: 'row',
    flex: 1
  }
}

function mapStateToProps(state) {
  return { likedFoods: state.likedFoods };
}

export default connect(mapStateToProps)(ReviewScreen);