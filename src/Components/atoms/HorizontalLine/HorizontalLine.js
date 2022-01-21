import React from 'react';
import styled from 'styled-components';
import MetroText, {SMALL} from 'atoms/MetroText/MetroText';
import {Dimensions} from 'react-native';
import {dark_grey} from 'src/colors';

const HorizontalLine = () => {
  const HorizontalLineWrapper = styled.View`
    opacity: 0.5;
    display: flex;
    padding: 0 15px;
    margin: 15px 0;
    flex-direction: row;
    align-items: center;
  `;
  //305px
  const Line = styled.View`
    margin: 0 10px;
    height: 3px;
    width: ${(Dimensions.get('window').width - 285) / 2}px;
    background-color: ${dark_grey};
    border-radius: 100px;
  `;
  return (
    <HorizontalLineWrapper>
      <Line />
      <MetroText size={SMALL} color={dark_grey}>
        już mam konto
      </MetroText>
      <Line />
    </HorizontalLineWrapper>
  );
};

export default HorizontalLine;
