import React from 'react';
import styled from 'styled-components/native';
import TopPanel from 'molecules/TopPanel/TopPanel';
import BottomPanel from 'molecules/BottomPanel/BottomPanel';

const RootViewWrapper = styled.View`
  background-color: #ffffff;
  width: 100%;
  height: 100%;
`;

const RootView = ({children}) => (
  <RootViewWrapper>
    <TopPanel />
    <BottomPanel />
    {children}
  </RootViewWrapper>
);

export default RootView;
