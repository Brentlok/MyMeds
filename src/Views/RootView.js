import React from 'react';
import {Keyboard, Dimensions} from 'react-native';
import {useLocation} from 'react-router-native';
import styled from 'styled-components/native';
import TopPanel from 'molecules/TopPanel/TopPanel';
import BottomPanel from 'molecules/BottomPanel/BottomPanel';
import GoBack from 'atoms/GoBack/GoBack';
import {white} from 'src/colors';

const RootView = ({children}) => {
  const {pathname} = useLocation();

  const RootViewWrapper = styled.Pressable`
    background-color: ${white};
    width: 100%;
    flex: 1;
    ${!pathname.includes('/start') && 'padding: 0 15px 70px 15px;'}
  `;

  return (
    <RootViewWrapper onPress={() => Keyboard.dismiss()}>
      {!pathname.includes('start') && pathname !== '/' && <TopPanel />}
      {!pathname.includes('start') && pathname !== '/' && <BottomPanel />}
      <GoBack show={!['/', '/home', '/start/start'].includes(pathname)} />
      {children}
    </RootViewWrapper>
  );
};

export default RootView;
