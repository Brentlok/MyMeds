import React from 'react';
import styled from 'styled-components/native';
import Icon, {HOME, CALENDAR, ADD} from 'atoms/Icon/Icon';
import {useLocation, useHistory} from 'react-router-native';

const PanelWrapper = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  elevation: 1;
  align-items: center;
  flex-direction: row;
  border: 0px solid #cdcdcd;
  border-top-width: 1px;
  padding: 0 40px;
`;

const BottomPanel = () => {
  const history = useHistory();

  const {pathname} = useLocation();

  return (
    <PanelWrapper>
      <Icon
        onPress={() => history.push('/add')}
        type={ADD}
        active={pathname === '/add'}
      />
      <Icon
        onPress={() => history.push('/')}
        type={HOME}
        active={pathname === '/'}
      />
      <Icon
        onPress={() => history.push('/calendar')}
        type={CALENDAR}
        active={pathname === '/calendar'}
      />
    </PanelWrapper>
  );
};

export default BottomPanel;
