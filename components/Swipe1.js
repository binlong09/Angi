import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Swipe extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
    keyProp: 'Id'
  }

  constructor() {
    super();

    position = new Animated.ValueXY();

    // this.rotate = this.position.x.interpolate({
    //   inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    //   outputRange: ['-10deg', '0deg', '10deg'],
    //   extrapolate: 'clamp'
    // })

    // this.rotateAndTranslate = {
    //   transform: [{
    //     rotate: this.rotate
    //   },
    //   ...this.position.getTranslateTransform()
    //   ]
    // }

    // this.likeOpacity = this.position.x.interpolate({
    //   inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    //   outputRange: [0, 0, 1],
    //   extrapolate: 'clamp'
    // })
    // this.dislikeOpacity = this.position.x.interpolate({
    //   inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    //   outputRange: [1, 0, 0],
    //   extrapolate: 'clamp'
    // })

    // this.nextCardOpacity = this.position.x.interpolate({
    //   inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    //   outputRange: [1, 0, 1],
    //   extrapolate: 'clamp'
    // })
    // this.nextCardScale = this.position.x.interpolate({
    //   inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    //   outputRange: [1, 0.8, 1],
    //   extrapolate: 'clamp'
    // })

    this.state = { index: 0, position };
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {

        this.state.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {

        if (gestureState.dx > 120) {
          Animated.spring(this.state.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ index: this.state.index + 1 }, () => {
              this.state.position.setValue({ x: 0, y: 0 })
            })
          })
        }
        else if (gestureState.dx < -120) {
          Animated.spring(this.state.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ index: this.state.index + 1 }, () => {
              this.state.position.setValue({ x: 0, y: 0 })
            })
          })
        }
        else {
          Animated.spring(this.state.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start()
        }
      },
      onPanResponderEnd: (evt, gestureState) => true
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 0 });
    }
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  forceSwipe(direction) {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.index];

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    this.state.position.setValue({ x: 0, y: 0 });
    this.setState({ index: this.state.index + 1 });
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCards() {
    console.log("props: ", this.props)
    console.log("state: ", this.state)
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }

    const deck = this.props.data.map((item, i) => {
      if (i < this.state.index) { return null; }

      if (i === this.state.index) {
        return (
          <Animated.View
            // {...this.panResponder.panHandlers}
            key={item[this.props.keyProp]}
            style={[this.getCardStyle(), styles.cardStyle, { zIndex: 99 }]}
            {...this.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }

      return (
        <Animated.View
          key={item[this.props.keyProp]}
          style={[styles.cardStyle, { top: 0, zIndex: -i }]}
        >
          {this.props.renderCard(item)}
        </Animated.View>
      );
    });

    return Platform.OS === 'android' ? deck.reverse() : deck.reverse();
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    elevation: 4
  }
};

export default Swipe;