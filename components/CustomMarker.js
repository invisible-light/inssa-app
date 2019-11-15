import React from 'react';
import styled from 'styled-components/native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faWalking, faBus} from '@fortawesome/free-solid-svg-icons';

import colors from '../utils/colors.json';
import useConstant from '../utils/useConstant';

export default function CustomMarker({type, selected = false}) {
  const typeColor = type === 'walk' ? 'gray' : 'pink';
  const primaryColor = colors[typeColor][8];
  const borderColor = colors[typeColor][7];
  const Container = useConstant(
    () => styled.View`
      padding: 8px;
      background-color: ${selected ? 'white' : primaryColor};
      border-radius: ${58 / 2};
      border: 5px solid ${selected ? primaryColor : borderColor};
    `,
  );

  return (
    <Container>
      <FontAwesomeIcon
        size={32}
        icon={type === 'walk' ? faWalking : faBus}
        color={selected ? primaryColor : 'white'}
      />
    </Container>
  );
}
