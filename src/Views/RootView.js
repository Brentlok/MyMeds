import React from 'react';
import {Keyboard, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import TopPanel from 'molecules/TopPanel/TopPanel';
import BottomPanel from 'molecules/BottomPanel/BottomPanel';
import {useLocation} from 'react-router-native';

const RootViewWrapper = styled.Pressable`
  background-color: #ffffff;
  width: 100%;
  height: ${Dimensions.get('window').height}px;
`;

const RootView = ({children}) => {
  const {pathname} = useLocation();
  return (
    <RootViewWrapper onPress={() => Keyboard.dismiss()}>
      {pathname.match(/\b(?:home|add|calendar|camera)\b/) !== null && (
        <>
          <TopPanel />
          <BottomPanel />
        </>
      )}
      {children}
    </RootViewWrapper>
  );
};

export default RootView;
