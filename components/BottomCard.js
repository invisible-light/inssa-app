import React from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components';

import colors from '../utils/colors.json';
// import padStart from '../utils/padStart';
import useConstant from '../utils/useConstant';

import exampleImage from '../assets/examples/light.png';

// const window = Dimensions.get('window');

function Header({onPress, closed}) {
  const Container = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    height: ${closed ? 80 : 95};
    justify-content: space-between;
    align-items: center;
    padding-bottom: ${closed ? 18 : 0};
    ${!closed &&
      `padding-bottom: 15;
      border-bottom-width: 1px;
      border-bottom-color: ${colors.gray[2]};`}
  `;
  const Image = useConstant(
    () => styled.Image`
      height: 80;
      width: 80;
      background-color: #f3f3f3;
      border-radius: 4;
    `,
  );
  const Info = useConstant(
    () => styled.View`
      display: flex;
    `,
  );
  const Title = useConstant(
    () => styled.Text`
      font-size: 26;
      font-weight: 800;
      color: ${colors.gray[9]};
    `,
  );
  const Address = useConstant(
    () => styled.Text`
      font-size: 13;
      color: ${colors.gray[6]};
    `,
  );
  const Description = useConstant(
    () => styled.Text`
      font-size: 14;
      color: ${colors.gray[7]};
    `,
  );

  return (
    <Container onPress={onPress}>
      <Image source={exampleImage} defaultSource={exampleImage} />
      <Info>
        <Title>신호등</Title>
        <Address>경기도 안산시 단원구 와동 사세충열로 94</Address>
        <Description>한국디지털미디어고등학교 앞 신호등입니다.</Description>
      </Info>
    </Container>
  );
}

const Container = styled.View`
  position: absolute;
  bottom: 0;
  background-color: white;
  width: 100%;
  padding: 0 22px;
  padding-top: 25;
  padding-bottom: 20;
  border-top-left-radius: 12;
  border-top-right-radius: 12;
  shadow-opacity: 0.2;
  shadow-radius: 16px;
  shadow-color: black;
  shadow-offset: 0px 5px;
`;

// const Illust = styled.Image`
//   position: absolute;
//   bottom: 0;
//   left: -120;
//   height: 280;
//   width: 100%;
//   z-index: -1;
// `;

// const Info = styled.View`
//   display: flex;
//   position: absolute;
//   bottom: 35%;
//   left: ${window.width / 2 - 44};
// `;

// const State = styled.Text`
//   font-size: 16;
//   font-weight: 800;
//   color: ${colors.gray[6]};
// `;

// const Field = styled.Text`
//   font-size: 20;
//   font-weight: 800;
//   color: ${colors.gray[8]};
// `;

// const Clock = styled.Text`
//   font-size: 70;
//   font-weight: 800;
//   line-height: 75;
//   color: ${colors.gray[8]};
// `;

// const secondsToClock = seconds => {
//   const offset = seconds % 3600;
//   return `${padStart(offset / 60, 2)}:${padStart(offset % 60, 2)}`;
// };

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    const {walk} = props;

    this.state = {
      time: 15,
      walk,
      redLight: 15,
      greenLight: 12,
      closed: true,
    };

    // this.resetTimer = this.resetTimer.bind(this);
    // this.onPressToggle = this.onPressToggle.bind(this);
  }

  // componentDidMount() {
  //   this.interval = setInterval(
  //     () =>
  //       this.setState(prevState => ({
  //         time: prevState.time - 1,
  //       })),
  //     1000,
  //   );
  // }

  // componentDidUpdate() {
  //   const {time} = this.state;
  //   if (time === 0) {
  //     this.resetTimer();
  //   }
  // }

  // resetTimer() {
  //   const {redLight, greenLight} = this.state;

  //   this.setState(prevState => ({
  //     walk: !prevState.walk,
  //     time: prevState.walk ? redLight : greenLight,
  //   }));
  // }

  // onPressToggle() {
  //   this.setState(prevState => ({
  //     closed: !prevState.closed,
  //   }));
  // }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    // const {time, walk, closed} = this.state;
    const {closed} = this.state;
    // const illustSource = walk
    //   ? require('../assets/illusts/running.png')
    //   : require('../assets/illusts/stopped.png');
    // const stateText = `지금은 ${walk ? '초록' : '빨간'} 불!`;
    // const fieldText = walk ? '보행할 수 있는 시간' : '보행 가능 시간까지';

    // const Content = styled.View`
    //   position: relative;
    //   height: 295;
    //   display: ${closed ? 'none' : 'flex'};
    // `;

    return (
      <Container>
        <Header onPress={this.onPressToggle} closed={closed} />
        {/* <Content>
          <Illust
            resizeMode={'contain'}
            source={illustSource}
            defaultSource={illustSource}
          />
          <Info>
            <State>{stateText}</State>
            <Field>{fieldText}</Field>
            <Clock>{secondsToClock(time)}</Clock>
          </Info>
        </Content> */}
      </Container>
    );
  }
}
