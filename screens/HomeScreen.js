import React, {Component} from 'react';
import {Alert, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import styled from 'styled-components/native';

import Beacons from 'react-native-beacons-manager';

import BottomCard from '../components/BottomCard';
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

const beaconRegions = [
  {
    identifier: 'light-1',
    uuid: '74278bda-b644-4520-8f0c-720eaf059935',
    major: 4660,
    minor: 64001,
  },
];

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

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
        {
          type: 'bus',
          selected: false,
          coordinate: {
            latitude: 37.339812,
            longitude: 126.8293598,
          },
        },
      ],
      beaconNearby: false,
      beaconCount: 0,
      timestamp: 0,
    };
    this.onRegionDidRange = this.onRegionDidRange.bind(this);
  }

  UNSAFE_componentWillMount() {
    Beacons.requestAlwaysAuthorization();
    Beacons.startMonitoringForRegion(beaconRegions[0]);
    Beacons.startRangingBeaconsInRegion(beaconRegions[0]);
    Beacons.startUpdatingLocation();
    console.debug(true);
  }

  componentDidMount() {
    this.regionDidEnterEvent = Beacons.BeaconsEventEmitter.addListener(
      'regionDidEnter',
      data => {
        // console.debug('monitoring - regionDidEnter data: ', data);
      },
    );

    this.beaconsDidRangeEvent = Beacons.BeaconsEventEmitter.addListener(
      'beaconsDidRange',
      this.onRegionDidRange,
    );
  }

  componentWillUnMount() {
    this.regionDidEnterEvent = null;
    this.beaconsDidRangeEvent = null;
  }

  onRegionDidRange(data) {
    try {
      const {beaconNearby, beaconCount} = this.state;

      const {beacons} = data;
      if (!beacons) {
        return;
      }

      const {distance, uuid} = beacons[0];

      if (distance > 0 && distance <= 1.7) {
        // 비컨 사정거리 안에 있다면
        if (!beaconNearby) {
          if (beaconCount < 3) {
            this.setState(prevState => ({
              beaconCount: prevState.beaconCount + 1,
            }));
          } else {
            this.setState({
              beaconNearby: true,
            });

            console.debug('주위에 신호등이 있습니다.', distance);
            Alert.alert('주위에 신호등이 있습니다.', uuid);
          }
        }
      } else {
        this.setState({
          beaconCount: 0,
        });
      }
    } catch (error) {
      console.debug(error, data);
    }
  }

  render() {
    return (
      <Container>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 37.3400526,
            longitude: 126.8294954,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          {this.state.markers.map((marker, idx) => (
            <Marker coordinate={marker.coordinate} key={idx}>
              <CustomMarker type={marker.type} selected={marker.selected} />
            </Marker>
          ))}
        </MapView>
        <BottomCard />
      </Container>
    );
  }
}
