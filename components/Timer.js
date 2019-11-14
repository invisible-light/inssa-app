import React, {Component} from 'react';
import styled from 'styled-components';

import colors from '../utils/colors.json';

const Text = styled.Text`
  font-size: 70;
  font-weight: 800;
  line-height: 75;
  color: ${colors.gray[8]};
`;

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 5,
    };
  }

  render() {
    const {time} = this.state;
    return <Text>{time}</Text>;
  }
}
