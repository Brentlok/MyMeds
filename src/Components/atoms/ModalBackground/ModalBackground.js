import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components/native';
import {Dimensions, Animated, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {changeModalTakenOpen} from 'src/actions';

const ModalBackground = () => {
  const {modalTakenOpen} = useSelector(state => state);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [show, setShow] = useState(false);

  fadeAnim.addListener(({value}) => {
    if (value > 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  });

  useEffect(() => {
    if (modalTakenOpen) {
      Animated.timing(fadeAnim, {
        toValue: 0.5,
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
  }, [fadeAnim, modalTakenOpen]);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(changeModalTakenOpen());
  };

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const ModalBackgroundView = styled(AnimatedPressable)`
    width: ${Dimensions.get('window').width}px;
    height: ${Dimensions.get('window').height}px;
    background-color: #000000;
    position: absolute;
    elevation: 7;
    display: flex;
    align-items: center;
    justify-content: center;
    ${!show && 'display: none;'}
  `;

  return (
    <ModalBackgroundView onPress={closeModal} style={{opacity: fadeAnim}} />
  );
};

export default ModalBackground;
