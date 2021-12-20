import React, {useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import {Dimensions, Animated} from 'react-native';
import ModalButton from 'atoms/ModalButton/ModalButton';
import Icon, {CLOSE, RING} from 'atoms/Icon/Icon';
import MetroText, {SMALL} from 'atoms/MetroText/MetroText';
import {useDispatch, useSelector} from 'react-redux';
import {changeModalTakenOpen} from 'src/actions';
import CloseIcon from 'assets/svg/close.svg';
import RingIcon from 'assets/svg/ring.svg';

const ModalBox = () => {
  const {modalTakenOpen, modalText} = useSelector(state => state);
  const positionAnim = useRef(
    new Animated.Value(parseInt(-Dimensions.get('window').width, 10)),
  ).current;

  useEffect(() => {
    if (modalTakenOpen) {
      Animated.timing(positionAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(positionAnim, {
        toValue: parseInt(-Dimensions.get('window').width, 10),
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalTakenOpen, positionAnim]);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(changeModalTakenOpen('close'));
  };

  const ModalBoxWrapper = styled(Animated.View)`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -70px;
    margin-left: -${(Dimensions.get('window').width - 30) / 2}px;
    width: ${Dimensions.get('window').width - 30}px;
    height: 140px;
    background-color: #f5f5f5;
    border-radius: 25px;
    elevation: 7;
    padding: 20px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
  `;

  const CloseIconBox = styled.TouchableOpacity`
    position: absolute;
    left: 15px;
    top: 15px;
  `;

  const RingIconBox = styled.TouchableOpacity`
    position: absolute;
    right: 15px;
    top: 15px;
  `;

  return (
    <ModalBoxWrapper style={{transform: [{translateX: positionAnim}]}}>
      <CloseIconBox onPress={closeModal}>
        <CloseIcon />
      </CloseIconBox>
      <MetroText size={SMALL}>{modalText}</MetroText>
      {modalText === 'Czy już przyjąłeś?' && (
        <RingIconBox>
          <RingIcon />
        </RingIconBox>
      )}
      <ModalButton yes />
      <ModalButton />
    </ModalBoxWrapper>
  );
};

export default ModalBox;
