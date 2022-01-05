import React from 'react';
import {Keyboard, Dimensions} from 'react-native';
import {useLocation} from 'react-router-native';
import styled from 'styled-components/native';
import TopPanel from 'molecules/TopPanel/TopPanel';
import BottomPanel from 'molecules/BottomPanel/BottomPanel';
import GoBack from 'atoms/GoBack/GoBack';
import {white} from 'src/colors';

const RootViewWrapper = styled.Pressable`
  background-color: ${white};
  width: 100%;
  height: ${Dimensions.get('window').height}px;
`;

const RootView = ({children}) => {
  const {pathname} = useLocation();
  return (
    <RootViewWrapper onPress={() => Keyboard.dismiss()}>
      <GoBack show={!['/', '/home', '/start/start'].includes(pathname)} />
      {!pathname.includes('start') && pathname !== '/' && (
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
