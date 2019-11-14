import React from 'react';
import styled from 'styled-components';

import colors from '../utils/colors.json';

function Header() {
  const Container = styled.View`
    display: flex;
    flex-direction: row;
    height: 95;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15;
    border-bottom-width: 1px;
    border-bottom-color: ${colors.gray[7]};
  `;
  const Image = styled.Image`
    height: 80;
    width: 80;
    background-color: #f3f3f3;
  `;
  const Info = styled.View`
    display: flex;
  `;
  const Title = styled.Text`
    font-size: 28;
    font-weight: 800;
    color: ${colors.gray[9]};
  `;
  const Address = styled.Text`
    font-size: 15;
    color: ${colors.gray[6]};
  `;
  const Description = styled.Text`
    font-size: 16;
    color: ${colors.gray[7]};
  `;

  return (
    <Container>
      <Image />
      <Info>
        <Title>신호등</Title>
        <Address>경기도 안산시 단원구 와동 사세충열로 94</Address>
        <Description>한국디지털미디어고등학교 앞 신호등입니다.</Description>
      </Info>
    </Container>
  );
}

function Content({walk}) {
  const Container = styled.View`
    position: relative;
    height: 295;
    display: flex;
  `;
  const Illust = styled.Image`
    position: absolute;
    bottom: 0;
    left: -120;
    height: 280;
    width: 100%;
    z-index: -1;
  `;
  const Info = styled.View`
    display: flex;
    position: absolute;
    bottom: 35%;
    right: 10;
  `;
  const State = styled.Text`
    font-size: 16;
    font-weight: 800;
    color: ${colors.gray[6]};
  `;
  const Field = styled.Text`
    font-size: 20;
    font-weight: 800;
    color: ${colors.gray[8]};
  `;
  const Clock = styled.Text`
    font-size: 70;
    font-weight: 800;
    line-height: 75;
    color: ${colors.gray[8]};
  `;

  const illustSource = walk
    ? require('../assets/illusts/running.png')
    : require('../assets/illusts/stopped.png');
  const stateText = `지금은 ${walk ? '초록' : '빨간'} 불!`;
  const fieldText = walk ? '보행할 수 있는 시간' : '보행 가능 시간까지';

  return (
    <Container>
      <Illust resizeMode={'contain'} source={illustSource} />
      <Info>
        <State>{stateText}</State>
        <Field>{fieldText}</Field>
        <Clock>01:30</Clock>
      </Info>
    </Container>
  );
}

export default function Card() {
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

  return (
    <Container>
      <Header />
      <Content walk={false} />
    </Container>
  );
}
