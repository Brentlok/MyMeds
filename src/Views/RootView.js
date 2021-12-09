import React from 'react';
import styled from 'styled-components/native';
import TopPanel from 'molecules/TopPanel/TopPanel';
import BottomPanel from 'molecules/BottomPanel/BottomPanel';
import {useDispatch} from 'react-redux';
import {setInputBlured} from 'src/actions';

const RootViewWrapper = styled.Pressable`
  background-color: #ffffff;
  width: 100%;
  height: 100%;
`;

const RootView = ({children}) => {
  const dispatch = useDispatch();

  return (
    <RootViewWrapper onPress={() => dispatch(setInputBlured())}>
      <TopPanel />
      <BottomPanel />
      {children}
    </RootViewWrapper>
  );
};

export default RootView;
