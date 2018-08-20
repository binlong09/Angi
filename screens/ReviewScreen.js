import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Review FOODs",
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

  renderLikedFOODs() {
    return this.props.likedFOODs.map(FOOD => {
      const { 
        company, formattedRelativeTime, url,
        longitude, latitude, FOODtitle, FOODkey
      } = FOOD;
      const initialRegion = {
        longitude,
        latitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02
      };

      return (
        <Card title={FOODtitle} key={FOODkey}>
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS == 'android'}
              scrollEnabled={false}
              initialRegion={initialRegion}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{formattedRelativeTime}</Text>
            </View>
            <Button
              title="Apply Now!"
              backgroundColor="#03A9F4"
              onPress={() => Linking.openURL(url)}
            />
          </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderLikedFOODs()}
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
  return { likedFOODs: state.likedFOODs };
}

export default connect(mapStateToProps)(ReviewScreen);