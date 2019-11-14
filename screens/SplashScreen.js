import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const window = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const imageSize = (window.width / 5) * 3;
const Image = styled.Image`
  height: ${imageSize};
  width: ${imageSize};
`;

const splash = require('../assets/splash.png');

export default class SplashScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.interval = setTimeout(
      () => this.props.navigation.navigate('Home'),
      1000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Container>
        <Image source={splash} resizeMode={'contain'} />
      </Container>
    );
  }
}
