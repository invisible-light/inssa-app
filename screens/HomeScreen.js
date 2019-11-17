import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {Alert, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import styled from 'styled-components/native';
import Beacons from 'react-native-beacons-manager';
import Tts from 'react-native-tts';
import database from '@react-native-firebase/database';

import BottomCard from '../components/BottomCard';
import CustomMarker from '../components/CustomMarker';

import isNotEmptyArray from '../utils/isNotEmptyArray';

Tts.setDefaultVoice('com.apple.ttsbundle.Yuna-compact');

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
      // timestamp: 0,
      walkable: false,
    };
    this.onClickUpdateWalkState = this.onClickUpdateWalkState.bind(this);
    this.onRegionDidRange = this.onRegionDidRange.bind(this);
  }

  UNSAFE_componentWillMount() {
    Beacons.requestAlwaysAuthorization();
    Beacons.startMonitoringForRegion(beaconRegions[0]);
    Beacons.startRangingBeaconsInRegion(beaconRegions[0]);
    Beacons.startUpdatingLocation();
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

    Tts.addEventListener('tts-start', event =>
      console.debug('tts start', event),
    );
    Tts.addEventListener('tts-finish', event =>
      console.debug('tts finish', event),
    );
    Tts.addEventListener('tts-cancel', event =>
      console.debug('tts cancel', event),
    );
  }

  componentWillUnMount() {
    this.regionDidEnterEvent = null;
    this.beaconsDidRangeEvent = null;
  }

  onClickUpdateWalkState() {
    // database()
    //   .ref('/walk/')
    //   .once('value', snapshot => {
    //     const walk = snapshot.val();
    //     this.setState({
    //       walkable: walk,
    //     });
    //     const message = `신호등이 ${walk ? '초록' : '빨간'} 색이 되었습니다.`;
    //     Tts.stop();
    //     Tts.speak(message);
    //     console.log(this.state);
    //     return;
    //   });
    this.setState(prevState => ({
      walkable: !prevState.walkable,
    }));
    const {walkable: walk} = this.state;
    const message = `신호등이 ${!walk ? '초록' : '빨간'} 색이 되었습니다.`;
    Tts.stop();
    Tts.speak(message);
  }

  async onRegionDidRange(data) {
    try {
      const {beaconNearby, beaconCount} = this.state;

      const {beacons} = data;
      if (!isNotEmptyArray(beacons)) {
        return;
      }

      // eslint-disable-next-line no-unused-vars
      const {distance, uuid} = beacons[0];

      console.log(distance);
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
            // 아두이노에서  Firebase.setBool 으로 빨/초 값 설정하면 그거 키에 접근~ 어쩌고
            // 여기서 Firebase에서 최근 신호등 상태 가져와야 함.
            database()
              .ref('/walk/')
              .once('value', snapshot => {
                const walk = snapshot.val();
                this.setState({
                  walkable: walk,
                });
                const message = `주위에 ${
                  snapshot.val() ? '초록' : '빨간'
                } 불인 신호등이 있습니다.`;
                Tts.stop();
                Tts.speak(message);
                // Alert.alert('연결됨', message);
                // 신호등 상태 넣은 안내음성
                return;
              });

            // Alert.alert('주위에 신호등이 있습니다.', uuid);
            // 여기서 Alert()를 없애고, 신호등 상태 업데이트 해야 함.
            // 신호등 상태 업데이트 한 거는 렌더링 따로 해줘야 하는데 이건 좀만 이따가 생각해 보자
            // 아 텐션 떨어졌다 어카지
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
    const {beaconNearby, walkable} = this.state;
    console.log('walkable?', walkable);
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
        <BottomCard
          hide={beaconNearby}
          walkable={walkable}
          onPress={this.onClickUpdateWalkState}
        />
      </Container>
    );
  }
}
