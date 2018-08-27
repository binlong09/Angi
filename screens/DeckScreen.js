import React, { Component } from 'react';
import { View, Text, Platform, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
// import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';
import CCard from '../components/CCard';
import CardStack from '../components/CardStack';
import Swipe from '../components/Swipe';
import * as actions from '../actions';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class DeckScreen extends React.Component {
  static navigationOptions = {
    title: 'Foods',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="description" size={30} color={tintColor} />;
    }
  }

  renderCard(food) {
    const initialRegion = {
      longitude: food.Longitude,
      latitude: food.Latitude,
      latitudeDelta: 0.006759003698505239,
      longitudeDelta: 0.01006056948800449
    }

    return (
      <Card title={food.Name} titleStyle={{ flexWrap: "wrap" }} containerStyle={styles.cardContainer} >
        <View>
          {/* <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android' ? true : false}
            initialRegion={initialRegion}
          >
          </MapView> */}
          <Image style={styles.thumbnail} source={{ uri: food.PhotoUrl }} />
         </View> 
        <View style={styles.detailWrapper}>
          <Text>{food.AvgRatingText}/10 trong {food.TotalReviews} đánh giá</Text>
          <View style={{ flexDirection: 'row' }} >
            <Icon name="location-on" size={15} />
            <Text>{food.Distance.toFixed(1)}km</Text>
          </View>
        </View>
        <Text>
          {food.Address}
        </Text>
      </Card>
    );
  }

  renderNoMoreCards = () => { //bind this to deckscreen so that this.props works.
    return (
      <Card title="No more foods">
        <Button
          title="Back To Map"
          large
          icon={{ name: 'my-location'}}
          backgroundColor="#03A9F4"
          onPress={() => this.props.navigation.navigate('map')}
        />
      </Card>
    )
  }

  render() {
    return (
      // <View style={{ marginTop: 10 }}>
      <View style={styles.container} >
        <Swipe
          data={this.props.foods}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={food => this.props.likeFood(food)}
          keyProp="Id"
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  container: {
    // height: Platform.OS === 'android' ? 60 : 60,
    flex: 1,
    flexDirection:'row',
    paddingTop: 20,
    justifyContent: 'space-between',
    alignItems:'flex-start',
    backgroundColor: '#E8E8E8',
  },
  cardContainer: {
    borderRadius: 8,
    marginBottom: 58,
    height: SCREEN_HEIGHT*0.85,
    backgroundColor: '#E8E8E8'
  },
  thumbnail: {
    width: SCREEN_WIDTH*0.82,
    height: 400
  }
}

function mapStateToProps({ foods }) {
  console.log(foods)
  return { foods };
}

export default connect(mapStateToProps, actions)(DeckScreen);