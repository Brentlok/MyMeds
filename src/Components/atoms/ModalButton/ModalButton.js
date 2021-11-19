import React from 'react';
import styled from 'styled-components/native';
import MetroText, {BOLD, SMALL} from 'atoms/MetroText/MetroText';
import Icon, {YES, NO} from 'atoms/Icon/Icon';
import LinearGradient from 'react-native-linear-gradient';

const ModalButton = ({yes}) => {
  const ModalButtonWrapper = styled.TouchableOpacity`
    margin: ${yes ? '25px 15px 0 20px' : '25px 20px 0 0'};
    width: 40%;
    height: 45px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 25px;
    ${!yes && 'border: 3px solid #ff5252'}
    overflow: hidden;
  `;
  const YesGradient = styled(LinearGradient)`
    width: 500px;
    height: 45px;
    position: absolute;
    top: 0;
    left: 0;
  `;
  return (
    <ModalButtonWrapper>
      {yes && (
        <YesGradient
          start={{x: 0, y: 0}}
          end={{x: 0.4, y: 0}}
          colors={['#17C79A', '#00FFBE']}
        />
      )}
      <Icon type={yes ? YES : NO} />
      <MetroText weight={BOLD} size={SMALL} color={yes ? '#ffffff' : '#FF5252'}>
        {yes ? 'TAK' : 'NIE'}
      </MetroText>
    </ModalButtonWrapper>
  );
};

export default ModalButton;
