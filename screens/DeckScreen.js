import React, { Component } from 'react';
import { Platform, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
// import { MapView } from 'expo';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
import * as actions from '../actions';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class DeckScreen extends React.Component {
  static navigationOptions = {
    title: 'Foods',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="paw" size={30} color={tintColor} />;
    }
  }

  // renderCard(food) {
  //   const initialRegion = {
  //     longitude: food.Longitude,
  //     latitude: food.Latitude,
  //     latitudeDelta: 0.006759003698505239,
  //     longitudeDelta: 0.01006056948800449
  //   }

  //   return (
  //     <Card title={food.Name} titleStyle={{ flexWrap: "wrap" }} containerStyle={styles.cardContainer} >
  //       <View>
  //         {/* <MapView
  //           scrollEnabled={false}
  //           style={{ flex: 1 }}
  //           cacheEnabled={Platform.OS === 'android' ? true : false}
  //           initialRegion={initialRegion}
  //         >
  //         </MapView> */}
  //         <Image style={styles.thumbnail} source={{ uri: food.PhotoUrl }} />
  //        </View> 
  //       <View style={styles.detailWrapper}>
  //         <Text>{food.AvgRatingText}/10 trong {food.TotalReviews} đánh giá</Text>
  //         <View style={{ flexDirection: 'row' }} >
  //           <Icon name="location-on" size={15} />
  //           <Text>{food.Distance.toFixed(1)}km</Text>
  //         </View>
  //       </View>
  //       <Text>
  //         {food.Address}
  //       </Text>
  //     </Card>
  //   );
  // }

  // renderNoMoreCards = () => { //bind this to deckscreen so that this.props works.
  //   return (
  //     <Card title="No more foods">
  //       <Button
  //         title="Back To Map"
  //         large
  //         icon={{ name: 'my-location'}}
  //         backgroundColor="#03A9F4"
  //         onPress={() => this.props.navigation.navigate('map')}
  //       />
  //     </Card>
  //   )
  // }

  render() {
    return (
      // <View style={{ marginTop: 10 }}>
      // <View style={styles.container} >
      //   <Swipe
      //     data={this.props.foods}
      //     renderCard={this.renderCard}
      //     renderNoMoreCards={this.renderNoMoreCards}
      //     onSwipeRight={food => this.props.likeFood(food)}
      //     keyProp="Id"
      //   />
      // </View>
      <Container>
        <Header />
        <View style={styles.container}>
          <DeckSwiper
            dataSource={this.props.foods}
            onSwipeRight={item => this.props.likeFood(item)}
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                    <Thumbnail source={{ uri: item.PhotoUrl }} />
                    <Body>
                      <Text>{item.Name}</Text>
                      <Text note>{item.AvgRatingText}/10 trong {item.TotalReviews} đánh giá</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{ height: 300, flex: 1 }} source={{ uri: item.PhotoUrl}} />
                </CardItem>
                <CardItem>
                  <CardItem style={styles.verticalBox}>
                    <Icon name="navigate" style={{ color: '#ED4A6A' }} />
                    <Text>{item.Distance.toFixed(1)}km</Text>
                  </CardItem>       
                  <Text style={styles.textStyle}>{item.Address}</Text>
                </CardItem>
              </Card>
            }
          />
        </View>
      </Container>
    );
  }
}

const styles = {
  verticalBox: {
    flexDirection: 'column',
    flex: 2,
  },
  container: {
    padding: 10
  },
  textStyle: {
    flex: 8
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
  if ( foods !== null ){
    foods = foods.sort((a, b) => parseFloat(a.Distance) - parseFloat(b.Distance));
  }  
  return { foods };
}

export default connect(mapStateToProps, actions)(DeckScreen);