import React from 'react';
import styled from 'styled-components';
import MetroText, {SMALL, LIGHT_GREY} from 'atoms/MetroText/MetroText';
import {Dimensions} from 'react-native';

const HorizontalLine = () => {
  const HorizontalLineWrapper = styled.View`
    opacity: 0.5;
    display: flex;
    padding: 0 15px;
    margin: 30px 0;
    flex-direction: row;
    align-items: center;
  `;
  //305px
  const Line = styled.View`
    margin: 0 10px;
    height: 3px;
    width: ${(Dimensions.get('window').width - 285) / 2}px;
    background-color: ${LIGHT_GREY};
    border-radius: 100px;
  `;
  return (
    <HorizontalLineWrapper>
      <Line />
      <MetroText size={SMALL} color={LIGHT_GREY}>
        już mam konto
      </MetroText>
      <Line />
    </HorizontalLineWrapper>
  );
};

export default HorizontalLine;
