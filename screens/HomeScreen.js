import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import styled from 'styled-components/native';

import CustomMarker from '../components/CustomMarker';

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
      markers: [
        {
          type: 'walk',
          selected: false,
          coordinate: {
            latitude: 37.3418931,
            longitude: 126.8315179,
          },
        },
        {
          type: 'walk',
          selected: true,
          coordinate: {
            latitude: 37.3419526,
            longitude: 126.8293454,
          },
        },
        {
          type: 'walk',
          selected: false,
          coordinate: {
            latitude: 37.340312,
            longitude: 126.8277398,
          },
        },
      ],
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
          }}>
          {this.state.markers.map((marker, idx) => (
            <Marker coordinate={marker.coordinate} key={idx}>
              <CustomMarker type={marker.type} selected={marker.selected} />
            </Marker>
          ))}
        </MapView>
      </Container>
    );
  }
}
