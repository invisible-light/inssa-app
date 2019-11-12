import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import styled from 'styled-components/native';

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const Container = styled.View`
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: [],
    };
  }

  render() {
    return (
      <Container>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 37.3419526,
            longitude: 126.8293454,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        />
      </Container>
    );
  }
}
