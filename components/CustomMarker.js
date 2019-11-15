import React from 'react';
import styled from 'styled-components/native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faWalking} from '@fortawesome/free-solid-svg-icons';

import useConstant from '../utils/useConstant';

export default function CustomMarker({selected = false}) {
  const primaryColor = '#7048E8';
  const Container = useConstant(
    () => styled.View`
      padding: 8px;
      background-color: ${selected ? 'white' : primaryColor};
      border-radius: ${58 / 2};
      border: 5px solid ${selected ? primaryColor : '#845EF7'};
    `,
  );

  return (
    <Container>
      <FontAwesomeIcon
        size={32}
        icon={faWalking}
        color={selected ? primaryColor : 'white'}
      />
    </Container>
  );
}
