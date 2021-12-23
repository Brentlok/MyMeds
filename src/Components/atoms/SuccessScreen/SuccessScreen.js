import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {Dimensions, Animated, Pressable} from 'react-native';
import MetroText, {BIG} from 'atoms/MetroText/MetroText';
import SuccessIcon from 'assets/svg/success.svg';

const SuccessScreen = ({fadeAnim, show}) => {
  useEffect(() => {
    if (show) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [fadeAnim, show]);

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const ModalBackgroundView = styled(AnimatedPressable)`
    width: ${Dimensions.get('window').width}px;
    height: ${Dimensions.get('window').height}px;
    background-color: rgba(255, 255, 255, 0.9);
    position: absolute;
    elevation: 7;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  return (
    <ModalBackgroundView style={{opacity: fadeAnim}} pointerEvents="none">
      <SuccessIcon />
      <MetroText size={BIG}>Pomyślnie dodano!</MetroText>
    </ModalBackgroundView>
  );
};

export default SuccessScreen;
