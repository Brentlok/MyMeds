import React from 'react';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions} from 'react-native';
import MetroText, {REGULAR, WHITE, BLACK} from 'atoms/MetroText/MetroText';

const Button = ({value, primary, secondary, onPress}) => {
  const ButtonWrapper = styled.TouchableOpacity`
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    overflow: hidden;
  `;
  const Gradient = styled(LinearGradient)`
    width: ${Dimensions.get('window').width - 30}px;
    height: 55px;
    position: absolute;
    top: 0;
    left: 0;
    ${secondary && 'transform: rotate(180deg)'}
  `;
  const Secondary = styled.View`
    width: ${Dimensions.get('window').width - 36}px;
    height: 49px;
    position: absolute;
    top: 3px;
    left: 3px;
    border-radius: 100px;
    background-color: #fff;
  `;
  return (
    <ButtonWrapper onPress={onPress}>
      <Gradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#17C79A', '#00FFBE']}
      />
      {secondary && <Secondary />}
      <MetroText size={REGULAR} color={primary ? WHITE : BLACK}>
        {value}
      </MetroText>
    </ButtonWrapper>
  );
};

export default Button;
