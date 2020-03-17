import React, { Component } from 'react'
import { Animated, Dimensions, Image, FlatList, Modal, StyleSheet, ScrollView } from 'react-native';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SigninScreen';
import { Button } from '../components';
import { Block } from '../components';
import { Text } from '../components';
import { theme } from '../components';

const { width, height } = Dimensions.get('window');

class WelcomeScreen extends React.Component {
  
  static navigationOptions = {
    header: null,
  }

  scrollX = new Animated.Value(0);

  state = {
    showTerms: false,
  }

  

  renderIllustrations() {
    const { illustrations } = this.props;

    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={illustrations}
        extraDate={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => (
          <Image
            source={item.source}
            resizeMode="contain"
            style={{ width, height: height / 2, overflow: 'visible' }}
          />
        )}
        onScroll={
          Animated.event([{
            nativeEvent: { contentOffset: { x: this.scrollX } }
          }])
        }
      />
    )
  }
  
  render() {
    const { navigation } = this.props;

    return (
      <Block>
        <Block center bottom flex={0.4}>
          <Text h1 center bold>
            Your Home.
            <Text h1 primary> Greener.</Text>
          </Text>
          <Text h3 gray2 style={{ marginTop: 25 / 2 }}>
            Enjoy the experience.
          </Text>
        </Block>
        <Block middle flex={0.5} margin={[0, 25 * 2]}>
          <Button gradient onPress={() => navigation.navigate(SigninScreen)}>
            <Text center semibold white>Login</Text>
          </Button>
          <Button shadow onPress={() => navigation.navigate(SignupScreen)}>
            <Text center semibold>Signup</Text>
          </Button>
        </Block>
      </Block>
    )
  }
}

export default WelcomeScreen;
