import React from 'react';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';

const AddItem = () => {
  const AddItemWrapper = styled.TouchableOpacity`
    width: 35px;
    height: 35px;
    border-radius: 35px;
    margin-right: 15px;
    elevation: 4;
  `;

  const AddItemPlusLine = styled.View`
    background-color: white;
    width: 15px;
    height: 3px;
    ${({horizontal}) => horizontal && 'transform: rotate(90deg);'}
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -1.5px;
    margin-left: -7.5px;
    border-radius: 3px;
  `;
  const AddItemGradient = styled(LinearGradient)`
    width: 35px;
    height: 35px;
    border-radius: 35px;
  `;
  return (
    <AddItemWrapper>
      <AddItemGradient
        start={{x: 0, y: 0}}
        end={{x: 1.5, y: 0}}
        colors={['#17C79A', '#00FFBE']}
      />
      <AddItemPlusLine />
      <AddItemPlusLine horizontal />
    </AddItemWrapper>
  );
};

export default AddItem;
