import React from 'react';
import {Keyboard, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import TopPanel from 'molecules/TopPanel/TopPanel';
import BottomPanel from 'molecules/BottomPanel/BottomPanel';

const RootViewWrapper = styled.Pressable`
  background-color: #ffffff;
  width: 100%;
  height: ${Dimensions.get('window').height}px;
`;

const RootView = ({children}) => {
  return (
    <RootViewWrapper onPress={() => Keyboard.dismiss()}>
      <TopPanel />
      <BottomPanel />
      {children}
    </RootViewWrapper>
  );
};

export default RootView;
